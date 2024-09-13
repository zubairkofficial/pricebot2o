// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import Helpers from '../../../Config/Helpers'; // Assuming you have a helper file for API URLs and authentication headers.

// const UserUsage = () => {
//   const { id } = useParams(); // Get the user ID from the URL parameters
//   const [documentCount, setDocumentCount] = useState(null); // To store the document count
//   const [contractSolutionCount, setContractSolutionCount] = useState(null); // To store contract solution count
//   const [dataProcessCount, setDataProcessCount] = useState(null);
//   const [loading, setLoading] = useState(true); // For loading state
//   const [error, setError] = useState(null); // For error state

//   useEffect(() => {
//     // Function to fetch user document count and contract solution count
//     const fetchUserUsage = async () => {
//       try {
//         const response = await axios.get(`${Helpers.apiUrl}user/${id}/document-count`, Helpers.authHeaders);

//         // Check if the response is valid
//         if (response.status === 200) {
//           setDocumentCount(response.data.document_count);
//           setContractSolutionCount(response.data.contract_solution_count); 
//           setDataProcessCount(response.data.data_process_count);// Set the contract solution count
//         } else {
//           throw new Error('Failed to fetch user usage data');
//         }
//       } catch (error) {
//         setError(error.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUserUsage();
//   }, [id]);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   return (
//     <div>
//       <h2>User Usage for User ID: {id}</h2>
//       <p>Document Count: {documentCount}</p>
//       <p>Contract Solution Count: {contractSolutionCount}</p>
//       <p>Data Processes Count: {dataProcessCount}</p> {/* Display contract solution count */}
//     </div>
//   );
// };

// export default UserUsage;
