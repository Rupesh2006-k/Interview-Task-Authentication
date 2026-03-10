import { QueryClient } from '@tanstack/react-query'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 min fresh
      retry: 2,
      refetchOnWindowFocus: false
    }
  }
})

export default queryClient