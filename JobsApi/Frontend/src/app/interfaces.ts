export interface LogIn{
    token : string, 
    user : {
        name : string
    }
}

export interface Register{
    name : string;
}

export interface Job {
    _id : string, 
    company : string , 
    position : string, 
    joblocation : string , 
    createdBy : string, 
    jobtype : string , 
    status : string ,
    createdAt : string ,
    updatedAt : string, 
    __v : number 
}

export interface Jobs{
    nbHits : number,  //number of jobs found 
    jobs : Job[]
}
export interface Token {
    userId: string,
    name: string,
    iat: number,
    exp: number
}


export interface ProfileInfo {
    name : string, 
    email : string, 
    lastname : string, 
    location : string 
}

export interface JobEventInfo {
    index : number , 
    job : Job
}