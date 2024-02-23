


export  abstract class BaseClassService {

  private mainCrmApi  = 'http://localhost:8000/api/'



  protected completePath(path :string) : string{
    return this.mainCrmApi + path + "/"
  }
}
