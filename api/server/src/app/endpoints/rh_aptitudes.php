<?php

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

use Illuminate\Database\Capsule\Manager as DB;

use App\Models\Users;
use App\Models\Aptitudes;
use App\Models\CompetencesBranchesAptitudes;
// use App\Models\Competences as competences;
// use App\Models\Branches as branches; 
$app->group("/api", function() use ($app){
 
    $app->group("/rh", function() use ($app){

        $app->group("/aptitudes", function() use ($app){
            $app->get("/list/{id}", function(Request $request,Response $response,$args){              
                $id= $request->getAttribute('id');
                $formations = Aptitudes::where('user_id', $id)->get();
                return $response->withStatus(200)
                    ->withJson($formations);
            });
           
            $app->post("/add", function(Request $request, Response $response,$args){
                $data = $request->getParsedBody();

                    $formations = Aptitudes::create([
                        'user_id'=>$data['user_id'],
                        'aptitude'=>$data['aptitude'],
                    ]);
                    if($formations && $data['competences_branches'] != NULL){
                        foreach ($data['competences_branches'] as $value) {
                            # code...
                            $competences_branches = CompetencesBranchesAptitudes::create([
                                'competence_id'=>$value['competence'],
                                'branche_id'=>$value['branche'],
                                'aptitude_id'=>$formations['id'],
                            ]);
                        }
                    }
                return $response->withStatus(200)
                                ->withJson($formations);
            });

            $app->put("/update/{id}", function(Request $request, Response $response,$args){
                $id= $request->getAttribute('id');
                $data= $request->getParsedBody();



                $formations = Aptitudes::where('id', $id)
                    ->update([
                        'user_id'=>$data['user_id'],
                        'aptitude'=>$data['aptitude'],
                    ]);

                    if($formations && $data['competences_branches'] != NULL){
                        foreach ($data['competences_branches'] as $value) {
                            # code...
                            $competences_branches = CompetencesBranchesAptitudes::where('aptitude_id', $id)
                            ->create([
                                'competence_id'=>$value['competence'],
                                'branche_id'=>$value['branche'],
                                'aptitude_id'=>$id,
                            ]);
                        }
                    }
                return $response->withStatus(200)
                                ->withJson($formations );
            });
                
            $app->delete("/delete/{id}", function(Request $request, Response $response,$args){
                $id= $request->getAttribute('id');
                $personnels = Aptitudes::where('id', $id)->delete();
                return $response->withStatus(200)
                                ->withJson($personnels ) ;
            });
        });


        $app->group("/competences_branches_aptitudes", function() use ($app){
            $app->get("/list/{id}", function(Request $request,Response $response,$args){              
                $id= $request->getAttribute('id');
           
                $users = DB::table('competences_branches_aptitudes')
                    ->join('competences', 'competences_branches_aptitudes.competence_id', '=', 'competences.id')
                    ->join('branches', 'competences_branches_aptitudes.branche_id', '=', 'branches.id')
                    ->join('aptitudes', 'competences_branches_aptitudes.aptitude_id', '=', 'aptitudes.id')
                    ->select('aptitudes.aptitude','aptitudes.id as aptitude_id','competences_branches_aptitudes.*', 'competences.libelle as c_libelle','competences.id as competence_id','branches.libelle','branches.id as branche_id')
                    ->where('aptitude_id', $id)
                    ->get();

                    return $response->withStatus(200)
                    ->withJson($users);
                // select * from users where active = ?
            });
           
            $app->post("/add", function(Request $request, Response $response,$args){
                $data = $request->getParsedBody();
                $formations = CompetencesBranchesAptitudes::create([
                    'aptitude_id'=>$data['aptitude_id'],
                    'competence_id'=>$data['competence_id'],
                    'branche_id'=>$data['branche_id'],
                ]);
                return $response->withStatus(200)
                                ->withJson($formations);
            });

            $app->put("/update/{id}", function(Request $request, Response $response,$args){
                $id= $request->getAttribute('id');
                $data= $request->getParsedBody();
                $formations = CompetencesBranchesAptitudes::where('id', $id)
                    ->update([
                        'aptitude_id'=>$data['aptitude_id'],
                        'competence_id'=>$data['competence_id'],
                        'branche_id'=>$data['branche_id'],
                    ]);
                return $response->withStatus(200)
                                ->withJson($formations );
            });
                
            $app->delete("/delete/{id}", function(Request $request, Response $response,$args){
                $id= $request->getAttribute('id');
                $personnels = Aptitudes::where('id', $id)->delete();
                return $response->withStatus(200)
                                ->withJson($personnels ) ;
            });
        });

        
    });

});