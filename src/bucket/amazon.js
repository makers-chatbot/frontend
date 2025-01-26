import AWS from "aws-sdk"

const region = "us-east-2"
const bucketName = "sid2-images"
const accessKeyId = ""
const secretAccessKey = ""


const s3 = new AWS.S3({
    region,
    accessKeyId,
    secretAccessKey,
    signatureVersion: 'v4'
})

export async function generateUploadURL() {


    console.log("Variables de entorno: ", import.meta.env.ACCESS_KEY)
    console.log("Variables de entorno: ",   import.meta.env.SECRET_ACCESS_KEY)

    const imageName = "image-" + Date.now()

    const params = {
        Bucket: bucketName,
        Key: imageName,
        Expires: 60
    }

    const uploadURL = await s3.getSignedUrlPromise('putObject', params)
    return uploadURL
}