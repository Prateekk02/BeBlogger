import config from "../config/config";
import {Client, Databases, Storage, Query, ID} from 'appwrite'

export class Service{
    client = new Client();
    databases;
    buket;    
    constructor(){
        this.client
            .setEndpoint(config.appwriteUrl)
            .setEndpoint(config.appwriteProjectId);           

        this.databases = new Databases(this.client);  
        this.buket = new Storage(this.client);          
    }

    async createPost({title, slug, content, status, userId, featuredImage}){
        try{
            return await this.databases.createDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,
                {
                    title, 
                    content, 
                    featuredImage,
                    status,
                    userId
                }
            )
        }catch(error){
            console.log("Appwrite service :: createPost :: error ", error);
        }
    }

    async updatePost(slug, {title, content, status, featuredImage}){
        try{
            return await this.databases.updateDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,
                {
                    title,
                    content, 
                    status, 
                    featuredImage
                }
            )
        }catch(error){
            console.log("Appwrite service::updatePost::error ", error);
        }
    }

    async deletePost(slug){
        try{
            await this.databases.deleteDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,                
            )
            return true;
        }catch(error){
            console.log("Appwrite service::deletePost::error ", error);
            return false;
        }
    }

    // Get only one post
    async getPost(slug){
        try{
            return await this.databases.getDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug
            )
            
        }catch(error){
            console.log("Appwrite service::getPost::error ", error);
            return false;
        }
    }

    // Get all posts whose status is active. -> use query.
    async getPosts(queries = [Query.equal('status', 'active')]){
        try{
            return await this.databases.listDocuments(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                queries,                
            )
        }catch(error){
            console.log("Appwrite service::getPosts::error ",error);
            return false;
        }
    }
    
    // file Upload services.

    async uploadFile(file){
        try{
            return await this.buket.createFile(
                config.appwriteBucketId,
                ID.unique(),
                file
            )
        }catch(error){
            console.log("Appwrite service::uploadFile::error ", error);
            return false;
        }
    }

    async deleteFile(fileId){
        try{
            await this.buket.deleteFile(
                config.appwriteBucketId,                
                fileId
            )
            return true;
        }catch(error){
            console.log("Appwrite service::deleteFile::error ", error);
            return false;
        }
    }

    // Preview file
    getFilePreview(fileId){
        return this.buket.getFilePreview(
            config.appwriteBucketId,
            fileId
        )
    }


    // You can add pagination, file for download... etc.


}

const service = new Service();

export default service;