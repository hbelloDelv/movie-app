import { createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import movieApi from "../../common/api/movieAPI";
import { APIKey } from "../../common/api/movieAPIKEY"

export const fetchAsyncMovies = createAsyncThunk(
    'movies/fetchAsyncMovies', 
    async (term) =>{
    
    const response = await movieApi
            .get(`?apikey=${APIKey}&s=${term}&type=movie`)
           return response.data;
})


export const fetchAsyncShows = createAsyncThunk(
    'movies/fetchAsyncShows', 
    async (term) =>{
    
    const response = await movieApi
            .get(`?apikey=${APIKey}&s=${term}&type=series`)
           return response.data;
})


export const fetchAsyncMovieOrShowDetail = createAsyncThunk(
    'movies/fetchAsyncMovieOrShowDetail', 
    async (id) =>{
    const response = await movieApi
            .get(`?apikey=${APIKey}&i=${id}&Plot=full`)
           return response.data;
})


const initialState ={
    movies: {},
    shows: {},
    selectedMovieOrShow: {}, 
}

export const movieSlice = createSlice({
    name: "movies",
    initialState,
    reducers: {
        removeSelectedMovieOrShow: (state) =>{
            state.selectedMovieOrShow = {};
        },
    }, 
    extraReducers: {
        [fetchAsyncMovies] : () =>{
            console.log("pending");
        },
        [fetchAsyncMovies.fulfilled] : (state, {payload}) =>{
            console.log("Fetched Successfully!");
            return { ...state, movies: payload}
        },
        [fetchAsyncMovies.rejected] : () =>{
            console.log("Rejected!");
        },
        [fetchAsyncShows.fulfilled] : (state, {payload}) =>{
            console.log("Fetched Successfully!");
            return { ...state, shows: payload}
        },
        [fetchAsyncMovieOrShowDetail.fulfilled] : (state, {payload}) =>{
            console.log("Fetched Successfully!");
            return { ...state, selectedMovieOrShow: payload}
        },
    },
})

export const { removeSelectedMovieOrShow } = movieSlice.actions;
export const getAllMovies = (state) => state.movies.movies
export const getAllShows = (state) => state.movies.shows;
export const getSelectedMovieOrShow = (state) => state.movies.selectedMovieOrShow;
export default movieSlice.reducer;