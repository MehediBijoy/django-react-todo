import {useState, useEffect, useCallback, useMemo} from 'react'

const useFetch = (baseUrl, method) => {
  const [data, setData] = useState()
  const url = useMemo(() => new URL(baseUrl), [baseUrl])

  const fetchData = useCallback(
    async (params, id = '') => {
      await fetch(new URL(id, url), {
        headers: {
          'content-type': 'application/json',
        },
        method: method,
        body: params ? JSON.stringify(params) : null,
      })
        .then((res) => res.json())
        .then((result) => setData(result))
    },
    [method, url]
  )

  useEffect(() => {
    if (method === 'get') {
      fetchData()
    }
  }, [method, fetchData])

  return [fetchData, data]
}

export default useFetch
