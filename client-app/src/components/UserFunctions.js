import axios from 'axios'



export const register = newUser => {
    return axios
        .post('users/register', {
            first_name: newUser.first_name,
            last_name: newUser.last_name,
            email: newUser.email,
            password: newUser.password
        })
        .then( res => {
            console.log(res.data)
        })
}


export const login = userCredentials => {
    return axios
        .post('users/login', {
            email: userCredentials.email,
            password: userCredentials.password
        })
        .then( res => {
            if( !res.error ){
                localStorage.setItem('usertoken', res.data.data)
                return res.data
            }else{
                console.log(res.data)
            }
        })
        .catch( err =>{
            console.log(err)
        })
}

export const profile = userToken => {
    return axios
        .get( 'users/profile', {
            params: {},
            headers: {'Authorization':userToken }
        })
        .then(res => {
           return res
        })
}