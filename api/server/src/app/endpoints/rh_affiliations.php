<?php

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

use App\Models\Users;
use App\Models\Affiliations;

$app->group("/api", function() use ($app){
 
    $app->group("/rh", function() use ($app){

        $app->group("/affiliations", function() use ($app){
            $app->get("/list/{id}", function(Request $request,Response $response,$args){              
                $id= $request->getAttribute('id');
                $affiliations = Affiliations::where('user_id', $id)->get();
                return $response->withStatus(200)
                    ->withJson($affiliations);
            });
           
            $app->post("/add", function(Request $request, Response $response,$args){
                $data = $request->getParsedBody();

                $start_date=strtotime($data['start_date']);
                $start_date = date('Y-m-d H:i:s', $start_date); 

                $end_date=strtotime($data['end_date']) ;
                $end_date = date('Y-m-d H:i:s', $end_date); 
               
                $affiliations = Affiliations::create([
                    'user_id'=>$data['user_id'],
                    'nom_association'=>$data['nom_association'],
                    'objet'=>$data['objet'],
                    'start_date'=>$start_date,
                    'end_date'=>$end_date,
                ]);
            
                return $response->withStatus(200)
                                ->withJson($affiliations);
            });

            $app->put("/update/{id}", function(Request $request, Response $response,$args){
                $id= $request->getAttribute('id');
                $data= $request->getParsedBody();

                $start_date=strtotime($data['start_date']);
                $start_date = date('Y-m-d H:i:s', $start_date);

                $end_date=strtotime($data['end_date']) ;
                $end_date = date('Y-m-d H:i:s', $end_date); 


                $affiliations = Affiliations::where('id', $id)
                    ->update([
                        'user_id'=>$data['user_id'],
                        'nom_association'=>$data['nom_association'],
                        'objet'=>$data['objet'],
                        'start_date'=>$start_date,
                        'end_date'=>$end_date,
                    ]);
                return $response->withStatus(200)
                                ->withJson($affiliations );
            });
                
            $app->delete("/delete/{id}", function(Request $request, Response $response,$args){
                $id= $request->getAttribute('id');
                $personnels = Affiliations::where('id', $id)->delete();
                return $response->withStatus(200)
                                ->withJson($personnels ) ;
            });
        });

        
    });

});