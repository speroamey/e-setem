<?php

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;
use App\Models\PersonnelsEtConsultants;
use App\Models\Identity;
use App\Models\DocumentsConsultants;
use App\Models\FichePaiements;
use App\Models\Users;


$app->group("/api", function() use ($app){
 
    $app->group("/rh", function() use ($app){

        $app->group("/personnels_consultants", function() use ($app){
            $app->get("/list", function(Request $request,Response $response,$args){              
                $PersonnelsEtConsultants = PersonnelsEtConsultants::all();
                return $response->withStatus(200)
                    ->withHeader("Content-Type", "application/json")
                    ->withJson($PersonnelsEtConsultants);
            });
           
            $app->post("/add", function(Request $request, Response $response,$args){
                $data = $request->getParsedBody();

                if($data['expiration_cin']){
                    $expiration_cin=strtotime($data['expiration_cin']) ;
                    $expiration_cin = date('Y-m-d H:i:s', $expiration_cin);
                }else{
                    $expiration_cin=null;
                }

                if($data['date_embauche']){
                    $date_embauche=strtotime($data['date_embauche']) ;
                    $date_embauche = date('Y-m-d H:i:s', $date_embauche); 
                }else{
                    $date_embauche=null;
                }

                if($data['date_naissance']){
                    $date_naissance=strtotime($data['date_naissance']) ;
                    $date_naissance= date('Y-m-d H:i:s', $date_naissance); 
                }else{
                    $date_naissance=null;
                }


                if($data['expiration_cin']){
                    $expiration_passport=strtotime($data['expiration_passport']) ;
                    $expiration_passport= date('Y-m-d H:i:s', $expiration_passport);     
                }else{
                    $expiration_passport= null;
                }
                              
              
                $personnels = PersonnelsEtConsultants::create([
                    'num_ifu'=>$data['num_ifu'],
                    'antennes_sites'=>$data['antennes_sites'],
                    'departements_services'=>$data['departements_services'],
                    'type_collaborateur'=>$data['type_collaborateur'],
                    'categorie_permis'=>$data['categorie_permis'],
                    'date_naissance'=>$date_naissance,
                    'nom_prenoms'=>$data['nom_prenoms'],
                    'date_embauche'=>$date_embauche,
                    'num_passport'=>$data['num_passport'],
                    'expiration_passport'=>$expiration_passport,
                    'anciennete'=>$data['anciennete'],
                    'address'=>$data['address'],
                    'num_tel'=>$data['num_tel'],
                    'nationalite'=>$data['nationalite'],
                    'categorie'=>$data['categorie'],
                    'expiration_cin'=>$expiration_cin
                ]);

                $username = $data['address'];
                $password = $data['address'];
                $isUserExists = Users::where('username', $username)->first();
                $hashpassword= passwordHash::hash($password);
                if($data[role]){
                    $role=$data[role];
                }else{
                    $role='USER';
                }
                if(empty($isUserExists)){
                    $us=Users::create([
                        'username'=>$data['address'],
                        'password'=>$hashpassword,
                        'email' => $data['address'],
                        'roles' => $role,
                        'address'=>$data['address']
                    ]);
                    $personnels->us=$us;
                }
                return $response->withStatus(200)
                                ->withJson($personnels);
            });

            $app->put("/update/{id}", function(Request $request, Response $response,$args){
                $id= $request->getAttribute('id');
                $data= $request->getParsedBody();

                if($data['expiration_cin']){
                    $expiration_cin=strtotime($data['expiration_cin']) ;
                    $expiration_cin = date('Y-m-d H:i:s', $expiration_cin);
                }else{
                    $expiration_cin=null;
                }

                if($data['date_embauche']){
                    $date_embauche=strtotime($data['date_embauche']) ;
                    $date_embauche = date('Y-m-d H:i:s', $date_embauche); 
                }else{
                    $date_embauche=null;
                }

                if($data['date_naissance']){
                    $date_naissance=strtotime($data['date_naissance']) ;
                    $date_naissance= date('Y-m-d H:i:s', $date_naissance); 
                }else{
                    $date_naissance=null;
                }


                if($data['expiration_cin']){
                    $expiration_passport=strtotime($data['expiration_passport']) ;
                    $expiration_passport= date('Y-m-d H:i:s', $expiration_passport);     
                }else{
                    $expiration_passport=null;
                }


                $personnels = PersonnelsEtConsultants::where('id', $id)
                    ->update([
                        'num_ifu'=>$data['num_ifu'],
                        'antennes_sites'=>$data['antennes_sites'],
                        'departements_services'=>$data['departements_services'],
                        'type_collaborateur'=>$data['type_collaborateur'],
                        'categorie_permis'=>$data['categorie_permis'],
                        'date_naissance'=>$date_naissance,
                        'nom_prenoms'=>$data['nom_prenoms'],
                        'date_embauche'=> $date_embauche,
                        'num_passport'=>$data['num_passport'],
                        'expiration_passport'=> $expiration_passport,
                        'anciennete'=>$data['anciennete'],
                        'address'=>$data['address'],
                        'num_tel'=>$data['num_tel'],
                        'nationalite'=>$data['nationalite'],
                        'categorie'=>$data['categorie'],
                        'expiration_cin'=> $expiration_cin
                    ]);
                return $response->withStatus(200)
                                ->withJson($personnels );
            });
                
            $app->delete("/delete/{id}", function(Request $request, Response $response,$args){
                $id= $request->getAttribute('id');
                $personnels = PersonnelsEtConsultants::where('id', $id)->delete();
                return $response->withStatus(200)
                                ->withJson($personnels ) ;
            });
        });



















        $app->group("/identity", function() use ($app){
            $app->get("/list/{id}", function(Request $request,Response $response,$args){              
                $id= $request->getAttribute('id');
                $identity = Identity::where('user_id', $id)->get();
                return $response->withStatus(200)
                    ->withJson($identity);
            });
           
            $app->post("/add", function(Request $request, Response $response,$args){
                $data = $request->getParsedBody();
                $birthday=strtotime($data['birthday']) ;
                $birthday = date('Y-m-d H:i:s', $birthday);

                $identity = Identity::create([
                    'user_id'=>$data['user_id'],
                    'phone'=>$data['phone'],
                    'sexe'=>$data['sexe'],
                    'email'=>$data['email'],
                    'first_name'=>$data['first_name'],
                    'last_name'=>$data['last_name'],
                    'birthday'=>$birthday,
                    'address'=>$data['address'],
                    'titre'=>$data['titre'],
                ]);

                return $response->withStatus(200)
                                ->withJson($identity);
            });

            $app->put("/update/{id}", function(Request $request, Response $response,$args){
                $id= $request->getAttribute('id');
                $data= $request->getParsedBody();
                $birthday=strtotime($data['birthday']) ;
                $birthday = date('Y-m-d H:i:s', $birthday);
               
                $identity = Identity::where('id', $id)
                    ->update([
                        'user_id'=>$data['user_id'],
                        'phone'=>$data['phone'],
                        'sexe'=>$data['sexe'],
                        'email'=>$data['email'],
                        'last_name'=>$data['first_name'],
                        'birthday'=>$birthday,
                        'address'=>$data['address'],
                        'titre'=>$data['titre'],
                    ]);
                    
                return $response->withStatus(200)
                                ->withJson($data);
            });
                
            // $app->delete("/delete/{id}", function(Request $request, Response $response,$args){
            //     $id= $request->getAttribute('id');
            //     $identity= Identity::where('id', $id)->delete();
            //     return $response->withStatus(200)
            //                     ->withJson($identity ) ;
            // });
        });



        $app->group("/document_consultants", function() use ($app){
            $app->get("/list", function(Request $request,Response $response,$args){              
                $DocumentsConsultants = DocumentsConsultants::all();
                return $response->withStatus(200)
                    ->withHeader("Content-Type", "application/json")
                    ->withJson($DocumentsConsultants);
            });
    
            $app->post("/add", function(Request $request, Response $response,$args){
                $data = $request->getParams();
                DocumentsConsultants::create([
                    'libelle'=>$data['libelle'],
                    'expiration_date'=>$data['expiration_date']
                ]);
                return $response->withStatus(200)
                ->withJson($data);
            });

            $app->put("/update/{id}", function(Request $request, Response $response,$args){
                $id= $request->getAttribute('id');
                $data= $request->getParams();
                DocumentsConsultants::where('id', $id)
                    ->update(['libelle' => $data['libelle']]);
                return $response->withStatus(200);
            });
                
            $app->delete("/delete/{id}", function(Request $request, Response $response,$args){
                $id= $request->getAttribute('id');
                DocumentsConsultants::where('id', $id)->delete();
                return $response->withStatus(200);
            });
        });



        $app->group("/fiche_paiements", function() use ($app){
            $app->get("/list", function(Request $request,Response $response,$args){              
                $FichePaiements = FichePaiements::all();
                return $response->withStatus(200)
                    ->withHeader("Content-Type", "application/json")
                    ->withJson($FichePaiements);
            });
    
            $app->post("/add", function(Request $request, Response $response,$args){
                $data = $request->getParams();
                FichePaiements::create([
                    'libelle'=>$data['libelle'],
                    'expiration_date'=>$data['expiration_date']
                ]);
                return $response->withStatus(200)
                ->withJson($data);
            });

            $app->put("/update/{id}", function(Request $request, Response $response,$args){
                $id= $request->getAttribute('id');
                $data= $request->getParams();
                FichePaiements::where('id', $id)
                    ->update(['libelle' => $data['libelle']]);
                return $response->withStatus(200);
            });
                
            $app->delete("/delete/{id}", function(Request $request, Response $response,$args){
                $id= $request->getAttribute('id');
                FichePaiements::where('id', $id)->delete();
                return $response->withStatus(200);
            });
        });

        
    });

});