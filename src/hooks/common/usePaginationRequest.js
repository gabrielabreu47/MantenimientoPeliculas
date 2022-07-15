//TODO ADAPTAR PARA QUE FUNCIONE CON EL PAGE QUE RETORNA EL API
import { useState } from 'react';
import { useAsync } from './useAsync';
import { useFetchAndLoad } from './useFetchAndLoad';

export const usePaginationRequest = (
  isApiRequest,
  fetchRequest,
  handleSuccess,
  handleDataEnded,
  additionalFetchParameters = {}
) => {
  const [data, setData] = useState([]);
  const [response, setResponse] = useState([]);
  const [page, setPage] = useState(1);
  const [recall, setRecall] = useState(0);
  const { loading, callEndpoint } = useFetchAndLoad();

  const request = async () => {
    if (isApiRequest) {
      return await callEndpoint(
        fetchRequest({ page: page, ...additionalFetchParameters })
      );
    }
    else {
      return fetchRequest({ page: page, ...additionalFetchParameters });
    }
  }

  const handleSuccesRequest = (data) => {
    if (data.results) {
      if (!data.results.length && page > 0) {
        setPage(page - 1);
        handleDataEnded('No more data');
      }
      setData(data);
      setResponse(data.results);
      handleSuccess(data);
    } else {
      if (!data.length && page > 0) {
        setPage(page - 1);
        handleDataEnded('No more data');
      }
      setData(data);
      setResponse(data);
      handleSuccess(data);
    }

  };

  useAsync({ request, handleSuccesRequest });
  useAsync({ request, handleSuccesRequest, dependencies: [page, recall, isApiRequest] });

  const handlePageChange = (newPage) => {
    if (newPage === page) return;
    if (newPage < 0) {
      return;
    }

    setPage(newPage);
  };

  const goBack = () => {
    handlePageChange(page - 1);
  };

  const goForward = () => handlePageChange(page + 1);

  const makeRecall = () => {
    setRecall(recall + 1);
  }

  return { loading, goBack, goForward, data, response, makeRecall };
};
