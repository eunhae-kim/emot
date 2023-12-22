import { useContext } from 'react';
import { TtimeContext } from '../context/TtimeContext';

export default function useTtimeContext() {
  const tTimeContext = useContext(TtimeContext);
  return tTimeContext;
}
