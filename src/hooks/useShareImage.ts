import { ref } from 'vue'

/**
 * Composable hook for sharing images using the Web Share API.
 *
 * @returns An object containing isSharing state and shareImage function.
 */
export function useShareImage() {
  const isSharing = ref(false)

  /**
   * Shares an image using the Web Share API.
   * @param {string} url - The URL of the image to share.
   * @param {string} [title] - An optional title for the share.
   * @param {string} [text] - An optional text for the share.
   *
   * @throws Will throw an error if the Web Share API is not supported.
   */
  const shareImage = async (url: string, title?: string, text?: string) => {
    if (!navigator.share) {
      throw new Error('Web Share API is not supported in this browser.')
    }

    isSharing.value = true

    try {
      await navigator.share({
        title: title || 'Check out this image',
        text: text || 'I found this image interesting',
        url: url
      })
    } catch (error) {
      console.error('Error sharing the image', error)
    } finally {
      isSharing.value = false
    }
  }

  return {
    isSharing,
    shareImage
  }
}
