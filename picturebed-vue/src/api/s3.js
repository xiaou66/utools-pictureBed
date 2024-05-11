import store from '@/store'
import AWS from 'aws-sdk'
import Utils from '@/js/Utils'
function s3 () {}
s3.uploadImage = (item, id) => {
  return new Promise((resolve, reject) => {
    const { endpoint, accessKeyId, secretAccessKey, region, bucket, version, path, baseUrl = '' } = store.state.oss.s3
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
    s3.config.update({ ...config })
    const { name } = item
    const key = Utils.getImageSavePath(path, name)
    s3.upload({
      Key: key,
      Bucket: bucket,
      Body: item
    }, (err, data) => {
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
