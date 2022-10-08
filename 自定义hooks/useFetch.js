const useFetch = () => {
  const [data, setData] = useState({
    hits: []
  });
  const [url, setUrl] = useState(
    'https://hn.algolia.com/api/v1/search?query=redux',
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        const result = await axios(url);

        setData(result.data);
      } catch (error) {
        setIsError(true);
      }

      setIsLoading(false);
    };

    fetchData();
  }, [url]);

  return [{
    data,
    isLoading,
    isError
  }, setUrl];
}

// 如何使用
//   function App() {
//     const [query, setQuery] = useState('redux');
//     const [{ data, isLoading, isError }, doFetch] = useFetch();

//     return (
//       <Fragment>
//         <form onSubmit={event => {
//           doFetch(`http://hn.algolia.com/api/v1/search?query=${query}`);

//           event.preventDefault();
//         }}>
//           <input
//             type="text"
//             value={query}
//             onChange={event => setQuery(event.target.value)}
//           />
//           <button type="submit">Search</button>
//         </form>

//         ...
//       </Fragment>
//     );
//   }
