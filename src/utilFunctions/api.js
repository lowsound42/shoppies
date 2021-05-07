import axios from "axios";
const apiKey = "9d23d1b7";

const initialCall = (formInput) => {
  return axios
    .get(`https://www.omdbapi.com/?s=${formInput}&type=movie&apikey=${apiKey}`)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
};

const pageCall = (formInput, page) => {
  return axios
    .get(
      `https://www.omdbapi.com/?s=${formInput}&type=movie&page=${page}&apikey=${apiKey}`
    )
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
};

const plotCall = (title) => {
  return axios
    .get(
      `https://www.omdbapi.com/?i=${title}&type=movie&plot=$short&apikey=${apiKey}`
    )
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
};

var utilFunctions = {
  initialCall,
  pageCall,
  plotCall,
};

export default utilFunctions;
