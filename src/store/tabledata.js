// import axios from "axios";



// export default {
//     state: {
//         tableData: [],
//     },
//     getters: {
//     },
//     mutations: {
//         setTableData(state, data) {
//             state.tableData = data;
//         },
//     },
//     actions: {
//         fetchTableData({ commit }, menuItem) {
//             return new Promise((resolve, reject) => {
//                 axios.get(`/api/data/${menuItem}`)
//                     .then(response => {
//                         commit('setTableData', response.data);
//                         resolve();
//                     })
//                     .catch(error => {
//                         console.error('Error fetching data:', error);
//                         reject(error);
//                     });
//             });
//         },
//         modules: {
//         }
//     },
// }
