import store from '../store/index'
import dayjs from 'dayjs'
import SparkMD5 from 'spark-md5'
const host = 'https://open-api.123pan.com'

const accessToken = {
  authorization: '',
  expired: ''
}

export async function getAccessToken () {
  if (accessToken.expired && accessToken.expired > Date.now()) {
    return accessToken.authorization
  }
  const { clientID, clientSecret } = store.state.oss.pan123
  await fetch(host + '/api/v1/access_token', {
    method: 'POST',
    body: JSON.stringify({
      clientID,
      clientSecret
    }),
    headers: {
      Authorization: '',
      Platform: 'open_platform'
    }
  }).then(res => res.json())
    .then(res => {
      accessToken.authorization = res.data.accessToken
      accessToken.expired = dayjs(res.data.expiredAt).valueOf()
    })
}
export async function getDirList () {
  await getAccessToken()
  return await fetch(host + '/api/v1/file/list?parentFileId=0&page=1&limit=100&orderBy=size&orderDirection=asc', {
    headers: {
      Authorization: accessToken.authorization,
      Platform: 'open_platform'
    }
  }).then(res => res.json())
    .then(res => res.data)
}

async function createFile (file, filename, etag) {
  await getAccessToken()
  const parentFileID = store.state.oss.pan123.parentFileID || '0'
  return await fetch(host + '/upload/v1/file/create', {
    method: 'POST',
    headers: {
      Authorization: accessToken.authorization,
      Platform: 'open_platform'
    },
    body: JSON.stringify({
      parentFileID,
      filename,
      etag,
      size: file.size
    })
  }).then(res => res.json())
    .then(res => res.data)
}

async function uploadComplete (preuploadID) {
  return await fetch(host + '/upload/v1/file/upload_complete', {
    method: 'POST',
    headers: {
      Authorization: accessToken.authorization,
      Platform: 'open_platform'
    },
    body: JSON.stringify({
      preuploadID
    })
  }
  ).then(res => res.json())
    .then(res => res.data.fileID)
}
async function getUploadUrl (preuploadID, sliceNo) {
  await getAccessToken()
  return await fetch(host + '/upload/v1/file/get_upload_url', {
    method: 'POST',
    headers: {
      Authorization: accessToken.authorization,
      Platform: 'open_platform'
    },
    body: JSON.stringify({
      preuploadID,
      sliceNo
    })
  }).then(res => res.json())
    .then(res => res.data.presignedURL)
}
//
function loadNext (fileReader, file, currentChunk, chunkSize) {
  const blobSlice = File.prototype.slice
  const start = currentChunk * chunkSize
  const end = ((start + chunkSize) >= file.size) ? file.size : start + chunkSize
  return fileReader.readAsArrayBuffer(blobSlice.call(file, start, end))
}
async function uploadAsyncResult (preuploadID) {
  return new Promise((resolve, reject) => {
    const interval = setInterval(() => {
      try {
        fetch(host + '/upload/v1/file/upload_async_result', {
          method: 'POST',
          headers: {
            Authorization: accessToken.authorization,
            Platform: 'open_platform'
          },
          body: JSON.stringify(preuploadID)
        }).then(res => res.json())
          .then(res => {
            if (res.code !== 0) {
              reject(res)
              clearInterval(interval)
            }
            if (res.data.completed && res.data.fileID !== 0) {
              clearInterval(interval)
              resolve()
            }
          })
      } catch (e) {
        reject(e)
      }
    }, 1200)
  })
}
async function getDirectLink (fileID) {
  return await fetch(host + '/api/v1/direct-link/url?fileID=' + fileID, {
    headers: {
      Authorization: accessToken.authorization,
      Platform: 'open_platform'
    }
  }).then(res => res.json())
    .then(res => res.data.url)
}
async function updateFile (item, id) {
  const md5 = await calcMD5(item)
  try {
    const res = await createFile(item, item.name, md5)
    if (res.reuse) {
      const directLink = await getDirectLink(res.fileID)
      console.log('directLink', directLink)
      return
    }
    const chunkSize = res.sliceSize // Read in chunks of 2MB
    const chunks = Math.ceil(item.size / chunkSize)
    const fileReader = new FileReader()
    let currentChunk = 0
    fileReader.onload = async (e) => {
      console.log(e.target.result)
      const uploadUrl = await getUploadUrl(res.preuploadID, currentChunk + 1)
      console.log(uploadUrl)
      await fetch(uploadUrl, {
        method: 'PUT',
        body: e.target.result
      })
      currentChunk++
      if (currentChunk < chunks) {
        loadNext(fileReader, item, currentChunk, chunkSize, chunkSize)
      } else {
        await uploadAsyncResult(res.preuploadID)
        const fileID = await uploadComplete(res.preuploadID)
        const directLink = await getDirectLink(fileID)
        console.log('finish', directLink)
      }
    }
    loadNext(fileReader, item, currentChunk, chunkSize)
  } catch (e) {
    console.log(e)
  }
}

function calcMD5 (file) {
  const blobSlice = File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice
  const chunkSize = 2097152 // Read in chunks of 2MB
  const chunks = Math.ceil(file.size / chunkSize)
  let currentChunk = 0
  const spark = new SparkMD5.ArrayBuffer()
  const fileReader = new FileReader()

  function loadNext () {
    const start = currentChunk * chunkSize
    const end = ((start + chunkSize) >= file.size) ? file.size : start + chunkSize
    fileReader.readAsArrayBuffer(blobSlice.call(file, start, end))
  }
  return new Promise(resolve => {
    fileReader.onload = function (e) {
      console.log('read chunk nr', currentChunk + 1, 'of', chunks)
      spark.append(e.target.result) // Append array buffer
      currentChunk++

      if (currentChunk < chunks) {
        loadNext()
      } else {
        console.log('finished loading')
        resolve(spark.end())
      }
    }

    fileReader.onerror = function () {
      console.warn('oops, something went wrong.')
    }
    loadNext()
  })
}
export default {
  updateFile
}
