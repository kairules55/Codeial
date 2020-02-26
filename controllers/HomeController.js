class HomeController{
    home(request,response){
        console.log(request.cookies);
        response.cookie('name','krishana');
        response.send('<h1>Krishana</h1>');
    }
}

module.exports = HomeController;