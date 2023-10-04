import { 
    createContext, 
    useContext, 
    useState, 
    useCallback, 
    useMemo 
} from "react";
import type { DiaryData, GetDiariesResponse } from "@lib/shared_types";
import { getDiaries } from "../utils/client"

// context is a way to share data between components without having to pass props down the component tree
type DiaryContextType = {
    diaries: DiaryData[],
    fetchDiaries: () => Promise<void>;
}
const DiaryContext = createContext<DiaryContextType>({
    diaries: [],
    fetchDiaries: async () => {},
})
type DiaryProviderProps = {
    children: React.ReactNode;
  };

// all data fetching and processing is done here, the rest of the app just consumes the data exposed by this provider
// when we run fetchLists or fetchCards, we update the state of the provider, which causes the rest of the app to re-render accordingly
export const DiaryProvider = ({ children }: DiaryProviderProps) => {
    const [rawDiaries, setRawDiaries] = useState<GetDiariesResponse>([]);
    
    // use useCallback to prevent the same function from rerender
    // due to function's different memory location 
    const fetchDiaries = useCallback(async () => {
        try{
            const { data } = await getDiaries();
            setRawDiaries(data)
        } catch (error) {
            alert("Error: failed to fetch diaries!")
        }
    }, [])

    const diaries = useMemo(() =>{
        const diaryMap = rawDiaries.reduce(
            (acc,diary) => {
                acc[diary.id] = { ...diary};
                return acc
            },
            {} as Record<string, DiaryData>,
        )
        return Object.values(diaryMap);
    },[rawDiaries]);

    return (
    <DiaryContext.Provider
        value={{
          diaries,
          fetchDiaries,
        }}
      >
        {children}
      </DiaryContext.Provider>
    )
}

// this is a custom hook, the name must start with "use"
export default function useDiary() {
    return useContext(DiaryContext);
  }