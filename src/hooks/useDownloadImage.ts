import { ref } from 'vue'

/**
 * Composable hook for downloading images.
 *
 * @returns An object containing isDownloading state and downloadImage function.
 */
export function useDownloadImage() {
  const isDownloading = ref(false)

  /**
   * Downloads an image from the provided URL.
   *
   * @param {string} url - The URL of the image to download.
   * @param {string} filename - The name of the image file, without extension.
   *
   * @throws Will throw an error if the download fails.
   */
  const downloadImage = async (url: string, filename: string) => {
    isDownloading.value = true
    try {
      const response = await fetch(url)
      const blob = await response.blob()
      const blobUrl = window.URL.createObjectURL(blob)

      const anchor = document.createElement('a')

      anchor.href = blobUrl

      // Extract file extension from the blob's type
      const extension = blob.type.split('/')[1] || 'jpg' // default to 'jpg' if type is not available

      // Construct filename with the extension
      anchor.download = `${filename}.${extension}`

      document.body.appendChild(anchor)
      anchor.click()
      document.body.removeChild(anchor)
      window.URL.revokeObjectURL(blobUrl)
    } catch (error) {
      console.error('Error downloading the image', error)
    } finally {
      isDownloading.value = false
    }
  }

  return {
    isDownloading,
    downloadImage
  }
}
