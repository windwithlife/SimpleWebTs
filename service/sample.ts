import ApiService , {IServicePromise} from "./api-service";

export default class Sample extends ApiService{
    constructor(props){
        super(props);
    }
    public doGet = (params: { ArticleId: number }) => this.get('/app/mock/288911/example/1629112601900', { params }) as IServicePromise;
    public doPost = (params: { name:string }) => this.post('/app/mock/288911/example/post/12345678', { params }) as IServicePromise;
}