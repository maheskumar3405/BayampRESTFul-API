# BayampRESTFul-API
A RESTFul API for practising basic CRUD operations


Our RESTful app is deployed at following URL.

“https://bayamprestapp.herokuapp.com/“

This RESTFul API supports following methods and endpoints



Navigate to any other endpoint gives 404 Error.


JSON Schema for POST Request

{
	“name” : “Bayamp”
}


Example Operations: 
1)A GET on “https://bayamprestapp.herokuapp.com/bayamp/engineers” gives the list of all BayAmp engineers with unique IDs in database with 200 response code

2)A POST on “https://bayamprestapp.herokuapp.com/bayamp/create” with a JSON request payload updates the database with 200 response code.


Sample Ideas for Java program practice:

Write a RESTFul Java Client to GET the engineers list , parse the JSON and extract the ID of a specific engineer and DELETE from database.

2)  Write a RESTful Java Client to CREATE an engineer and do a GET to check if the user has been created or not.


Note: Report any bugs found/feature suggestions to the e-mail below.


Author : maheshkumar3405@gmail.com
