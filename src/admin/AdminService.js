import http from "./http-common";


const getAll = () => {
    
    return http.get("/admin");
};

const AdminService = {
    getAll
};

export default AdminService;

