import { Project } from "@/types/project";
import { PROJECTS_DATA } from "@/data/projects"; // File data bạn đã chuẩn bị

/** * 1. INTERFACES */
interface ProjectState {
  allProjects: Project[];       // Dữ liệu gốc
  filteredProjects: Project[];  // Dữ liệu sau khi lọc để hiển thị
  filters: {
    keyword: string;
    status: string;
    investor: string;
  };
  loading: boolean;
}

const initialState: ProjectState = {
  allProjects: PROJECTS_DATA,
  filteredProjects: PROJECTS_DATA,
  filters: {
    keyword: "",
    status: "",
    investor: "",
  },
  loading: false,
};

/** * 2. ACTION TYPES */
export const SET_PROJECT_FILTERS = 'SET_PROJECT_FILTERS' as const;
export const RESET_PROJECT_FILTERS = 'RESET_PROJECT_FILTERS' as const;

/** * 3. ACTIONS */
export const setProjectFilters = (filters: Partial<ProjectState['filters']>) => ({
  type: SET_PROJECT_FILTERS,
  payload: filters,
});

export const resetProjectFilters = () => ({
  type: RESET_PROJECT_FILTERS,
});

/** * 4. REDUCER */
type ProjectAction = 
  | { type: typeof SET_PROJECT_FILTERS; payload: Partial<ProjectState['filters']> }
  | { type: typeof RESET_PROJECT_FILTERS };

const projectReducer = (state = initialState, action: ProjectAction): ProjectState => {
  switch (action.type) {
    case SET_PROJECT_FILTERS: {
      const newFilters = { ...state.filters, ...action.payload };
      const { keyword, status, investor } = newFilters;

      const newList = state.allProjects.filter((pj) => {
        const matchKeyword = pj.name.toLowerCase().includes(keyword.toLowerCase()) || 
                             pj.address.toLowerCase().includes(keyword.toLowerCase());
        const matchStatus = status === "" || pj.status === status;
        const matchInvestor = investor === "" || pj.investor === investor;

        return matchKeyword && matchStatus && matchInvestor;
      });

      return {
        ...state,
        filters: newFilters,
        filteredProjects: newList,
      };
    }

    case RESET_PROJECT_FILTERS:
      return {
        ...initialState,
        allProjects: state.allProjects
      };

    default:
      return state;
  }
};

export default projectReducer;