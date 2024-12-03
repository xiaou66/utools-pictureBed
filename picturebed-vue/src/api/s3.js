import store from '@/store'
import AWS from 'aws-sdk'
import Utils from '@/js/Utils'
function s3 () {}

const fileSuffixMap = {
  png: 'image/png',
  jpeg: 'image/jpeg',
  jpg: 'image/jpeg',
  gif: 'image/gif',
  webp: 'image/webp'
}
s3.uploadImage = (item, id) => {
  return new Promise((resolve, reject) => {
    const { endpoint, accessKeyId, secretAccessKey, region, bucket, version, path, forcePathStyle, baseUrl = '' } = store.state.oss.s3
    const s3 = new AWS.S3()
    const config = {
      accessKeyId: accessKeyId,
      secretAccessKey: secretAccessKey,
      region: region,
      endpoint: endpoint
    }
    if (version) {
      config.apiVersion = version
    }
    if (forcePathStyle) {
      config.s3ForcePathStyle = forcePathStyle
    }
    s3.config.update({ ...config })
    const { name } = item
    const key = Utils.getImageSavePath(path, name)
    const params = {
      Key: key,
      Bucket: bucket,
      Body: item
    }
    const fileNameSplit = name.split('.')
    if (fileNameSplit.length > 1 && fileSuffixMap[fileNameSplit[1]]) {
      params.ContentType = fileSuffixMap[fileNameSplit[1]]
    }

    s3.upload(params, (err, data) => {
      const url = baseUrl ? baseUrl + '/' + data.Key : data.Location
      if (err) {
        resolve({ status: 403, message: '上传失败: ' + err })
      } else {
        resolve({ status: 200, url, id })
      }
    })
  })
}
export default s3
