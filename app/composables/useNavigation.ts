export const useNavigation = () => {
  const router = useRouter()
  const { t } = useI18n()
  
  const navigateTo = (path: string) => {
    router.push(path)
  }
  
  return {
    navigateTo,
    t
  }
}
