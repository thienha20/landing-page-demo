<?php

namespace App\Http\Controllers;
use App\Models\Components as CP;
use App\Models\LandingPage as LP;
use Illuminate\Http\Request;
use Illuminate\Database\QueryException;


class ComponentHanding extends Controller
{
    //
    public function insertComponent(Request $request)
    {
        $listBlock = $request->component;
        $listBlock = json_decode($listBlock, true);
        if(isset($request->landingPageId)){
            CP::where('landing_page_id', $request->landingPageId)->delete();
        }
        foreach ($listBlock as $key=> $item){
            //insert mongoDB
            $item['position'] = $key;
            $item['landing_page_id'] = $request->landingPageId;
            CP::create($item);
        }
        return response()->json(['status'=>'success']);
    }
    public function getComponentFromLpId(Request $request){
        $lp = LP::find($request->id);
        $listComponent = CP::where('landing_page_id', $request->id)->get();
        return view('backend.landingpage',['listComponent'=>$listComponent,'landingpage'=>$lp]);
    }
    public function convertDomain(){
        $lp = CP::all();
        foreach ($lp as $item){
            if(!empty($item['data'])){
                $arr_product = $item['data'];
                foreach ($arr_product as &$value){
                    if(!empty($value['link_img'])){
                        $value['link_img'] = str_replace("https://v2.tatmart.com","https://tatmart.com",$value['link_img']);
//                        $value['link_img'] = str_replace("https://tatmart.com","https://v2.tatmart.com",$value['link_img']);
                    }
                    if(!empty($value['image'])){
//                        $value['image'] = str_replace("https://tatmart.com","https://v2.tatmart.com",$value['image']);
                        $value['image'] = str_replace("https://v2.tatmart.com","https://tatmart.com",$value['image']);
                    }
                    if(!empty($value['url'])){
//                        $value['url'] = str_replace("https://tatmart.com","https://v2.tatmart.com",$value['url']);
                        $value['url'] = str_replace("https://v2.tatmart.com","https://tatmart.com",$value['url']);
                    }
                }
                //update component
                $cp = CP::find($item['_id']);
                $cp->data = $arr_product;
                $cp->save();
            }
        }
//        print_r($cp);
         die;
    }

}
