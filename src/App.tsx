import { Suspense, useEffect } from 'react'
import { RouterProvider } from 'react-router-dom'
import router from 'ROUT'
import ClockLoader from 'react-spinners/ClockLoader'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Provider } from 'react-redux'
import { store } from 'RDUX/store'
import { createTheme, ThemeProvider, theme } from 'flowbite-react'
function App () {
  // Create a client
  const queryClient = new QueryClient()

  const customTheme = createTheme(theme)

  return (
    <Suspense
      fallback={
        <div className='w-screen h-screen flex items-center justify-center'>
          <ClockLoader
            color={'blue'}
            // loading={true}
            size={50}
            aria-label='Loading Spinner'
            data-testid='loader'
          />
        </div>
      }
    >
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider theme={customTheme}>
            <RouterProvider router={router} />
          </ThemeProvider>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </Provider>
    </Suspense>
  )
}

export default App
