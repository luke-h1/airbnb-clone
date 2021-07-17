upload image gql 
mutation UploadImage($file: Upload!) {
  uploadImage(file: $file) {
    Location
  }
}
