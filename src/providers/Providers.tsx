import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { useState } from 'react'
import { Toaster } from 'react-hot-toast'
import { Provider } from 'react-redux'
import { store } from '@/app/store/store'

export default function Providers({ children }: { children: React.ReactNode }) {
  const [client] = useState(new QueryClient())

  return (
    <Provider store={store}>
      <QueryClientProvider client={client}>
        {children}
        <Toaster />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </Provider>
  )
}
