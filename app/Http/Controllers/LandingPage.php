<?php

namespace App\Http\Controllers;

use App\Models\LandingPage as LP;
use App\Models\Components as CP;
use Illuminate\Http\Request;
use Carbon\Carbon;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Auth;
use App\Models\User as User;
use Maatwebsite\Excel\Facades\Excel;
use Illuminate\Support\Facades\Storage;
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Reader\Exception;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
use PhpOffice\PhpSpreadsheet\IOFactory;
use PhpOffice\PhpSpreadsheet\RichText\RichText;
use PhpOffice\PhpSpreadsheet\Shared\Date;
use PhpOffice\PhpSpreadsheet\Style\Alignment;
use PhpOffice\PhpSpreadsheet\Style\Border;
use PhpOffice\PhpSpreadsheet\Style\Color;
use PhpOffice\PhpSpreadsheet\Style\Fill;
use PhpOffice\PhpSpreadsheet\Style\Font;
use PhpOffice\PhpSpreadsheet\Style\NumberFormat;
use PhpOffice\PhpSpreadsheet\Style\Protection;
use PhpOffice\PhpSpreadsheet\Worksheet\Drawing;
use PhpOffice\PhpSpreadsheet\Worksheet\PageSetup;
class LandingPage extends Controller
{
    //
    public function reviewLandingPage($slug)
    {
        $dt = Carbon::now();
        $idLP = LP::where('slug', $slug)
            ->first();
        $ids = [];
        if (isset($idLP->_id)) {
            $listComponent = CP::where('landing_page_id', $idLP->_id)->get()->toJson();
            $listComponent = json_decode($listComponent, true);
            foreach ($listComponent as &$value) {
                if ($value['type'] == 'product') {
                    foreach ($value['data'] as $product) {
                        if (!in_array($product['id'], $ids)) {
                            array_push($ids, $product['id']);
                        }

                    }

                }
                if ($value['type'] == 'banner') {
                    foreach ($value['data'] as &$banner) {
                        list($width, $height, $type, $attr) = @getimagesize($banner['link_img']);
                        $banner['height'] = $height;
                        $banner['width'] = $width;
                    }
                }
            }
            if (!empty($ids)) {
                if($idLP->use_for_page == "tatmartv1"){
                    $url = config('constants.api_tatmart_v1').'products/get-list-product-landing-page?id=';
                    $response = $this->call_ntl_api_job($url,implode(",", $ids), '', config('constants.authorization_v1'));
                }
                elseif($idLP->use_for_page == "tatmartv2"){
                    $url = config('constants.api_tatmart_v2').'api/products?status[]=A&company_info=1&limit=400&pid=';
                    $response = $this->call_ntl_api_job($url,implode(",", $ids), '', config('constants.authorization_v2'));
                }
                elseif($idLP->use_for_page == "mrtho"){
                    $url = config('constants.api_mr_tho');
                    $response = $this->call_ntl_api_job($url,implode(",", $ids), '', '');
                }
                if(!empty($response)){
                    $response = json_decode($response);
                    $arr = [];
                    foreach ($response->products as $p) {
                        if(isset($p->price) && isset($p->product))
                            $arr[$p->product_id] = ["product_id" => $p->product_id,"product" => $p->product, "price" => floatval($p->price),
                                "list_price" => (!empty($p->base_price) && floatval($p->base_price) > floatval($p->list_price)) ? floatval($p->base_price): floatval($p->list_price)];
                    }
                    foreach ($listComponent as &$value) {
                        if ($value['type'] == 'product') {
                            foreach ($value['data'] as &$v) {
                                if(isset($arr[$v["id"]])){
                                    $v['price'] = $arr[$v["id"]]["price"];
                                    $v['name'] = $arr[$v["id"]]["product"];
                                    $v['promotion_price'] = $arr[$v["id"]]["list_price"];
                                }
                            }
                        }
                    }
                }
            }
            return view('frontend.landingpage', ['listComponent' => $listComponent,'status' => 0]);
        }
        return false;

    }


    public function showLandingPage($slug)
    {
        $dt = Carbon::now();
        $idLP = LP::where('slug', $slug)
            ->where('status','1')
//            ->where('end_time','>=',$dt)
//            ->where('start_time','<=',$dt)
            ->first();
        $ids = [];
        $listProduct = [];
        $flg=0;
        if (isset($idLP->_id)) {
            if( $idLP->end_time < $dt || $idLP->start_time>$dt){
                $flg = 1;
            }
            $listComponent = CP::where('landing_page_id', $idLP->_id)->get()->toJson();
            $listComponent = json_decode($listComponent, true);
            foreach ($listComponent as &$value) {
                if ($value['type'] == 'product') {
                    foreach ($value['data'] as $product) {
                        if (!in_array($product['id'], $ids)) {
                            array_push($ids, $product['id']);
                        }

                    }

                }
                if ($value['type'] == 'banner') {
                    foreach ($value['data'] as &$banner) {
                        list($width, $height, $type, $attr) = @getimagesize($banner['link_img']);
                        $banner['height'] = $height;
                        $banner['width'] = $width;
                    }
                }
            }
            if (!empty($ids)) {
                if($idLP->use_for_page == "tatmartv1") $url = config('constants.api_tatmart_v1').'products/get-list-product-landing-page?id=';
                elseif($idLP->use_for_page == "tatmartv2") $url = config('constants.api_tatmart_v2').'api/products?status[]=A&company_info=1&limit=400&pid=';
                elseif($idLP->use_for_page == "mrtho") $url = config('constants.api_mr_tho');
                $response = $this->call_ntl_api_job($url,implode(",", $ids), '', '');
                if(!empty($response)){
                    $response = json_decode($response);
                    $arr = [];
                    foreach ($response->products as $p) {
                        if(isset($p->price) && isset($p->product))
                            $arr[$p->product_id] = ["product_id" => $p->product_id,"product" => $p->product, "price" => floatval($p->price),"list_price" => (!empty($p->base_price) && floatval($p->base_price) > floatval($p->list_price)) ? floatval($p->base_price): floatval($p->list_price)];
                    }
                    foreach ($listComponent as &$value) {
                        if ($value['type'] == 'product') {
                            foreach ($value['data'] as &$v) {
                                if(isset($arr[$v["id"]])){
                                    $v['price'] = $arr[$v["id"]]["price"];
                                    $v['name'] = $arr[$v["id"]]["product"];
                                    $v['promotion_price'] = $arr[$v["id"]]["list_price"];
                                }
                            }
                        }
                    }
                }
            }
            return view('frontend.landingpage', ['listComponent' => $listComponent,'status' => $flg]);
        }
        return false;
    }

    public function createLandingPage(Request $request){
        $dataLp = LP::where('_id', $request->idLP)->first();
        return view('backend.landingpage.createlandingpage',['dataLp'=>$dataLp]);
    }

    public function insertLandingPage(Request $request)
    {
        $validate = $request->validate(
            [
                'slug' => 'required',
                'name' => 'required',
                'use_for_page' => 'required',
                'start_time' => 'required',
                'end_time' => 'required',
            ]);
        $landingpage = [
            'name' => $request->name,
            'slug' => $request->slug,
            'use_for_page' => $request->use_for_page,
            'start_time' =>$request->start_time?Carbon::parse($request->start_time)->format('d-m-Y H:i:s'):'',
            'end_time' => $request->end_time?Carbon::parse($request->end_time)->format('d-m-Y H:i:s'):'',
            'status' => $request->status?$request->status:0,
        ];
        // cant use updateOrCreate() function for this case
        if(isset($request->landingPageId)){
           // update landing page
            $lp = LP::find($request->landingPageId);
            $lp->name = $request->name;
            $lp->create_date = date("Y-m-d");
            $lp->use_for_page = $request->use_for_page;
            $lp->start_time = $request->start_time?Carbon::parse($request->start_time)->format('d-m-Y H:i:s'):'';
            $lp->end_time = $request->end_time?Carbon::parse($request->end_time)->format('d-m-Y H:i:s'):'';
            $lp->status = $request->status?$request->status:0;
            $lp->save();
            if(isset($request->gotolayout) && $request->gotolayout == 1)
                return redirect()->route('editcomponent', ['id' => $lp->_id]);
            return redirect()->route('listlandingpage');
        }else{
            //insert landing page
            $lp = LP::where('name', $request->name)->orWhere('slug', $request->slug)->first();
            if (isset($lp->name)) {
                return response()->json(['something was wrong']);
            } else{
                $lp = LP::create($landingpage);
                if(isset($request->gotolayout)  && $request->gotolayout == 1)
                return redirect()->route('editcomponent', ['id' => $lp->_id]);
                return redirect()->route('listlandingpage');
            }
        }
    }
    public function listLandingPage(Request $request){
        $lp = LP::query();
        $search_name = $request->name ?? '';
        if(!empty($search_name)) {
            $lp->where('name', 'LIKE',"%{$search_name}%");
        }
        $lp = $lp->orderBy('end_time', 'desc')->paginate(10);
        return view('backend.admin',['listLp'=>$lp, 'search_name' => $search_name]);
    }

    public function statusLandingPage(Request $request){
        $lpId = $request->id ? $request->id : '';
        $stt = $request->status ? $request->status : 0;
        if($lpId != ''){
            $lp = LP::find($lpId);
            $lp->status = $stt;
            $lp->save();
        }
        return redirect()->route('listlandingpage');
    }

    private function call_ntl_api_job($url,$params = '', $method = 'GET', $auth = '')
    {
        $api_url = $url . $params;
        $headers = array(
            "Authorization: Basic YWRtaW5AdGF0bWFydC5jb206bGJyNXliNjdZNTh5OFNjMDFwR0QxNGIxa0pHMDgyeTQ=="

        );
        if (!empty($auth)) {
            $headers = ['Authorization: ' . $auth];
        }
        $curl = curl_init();
        if ($method == 'POST') {
            $params = json_encode($params);
            curl_setopt($curl, CURLOPT_POST, true);
            curl_setopt($curl, CURLOPT_POSTFIELDS, $params);
        } else if ($method == 'PUT') {
            $params = json_encode($params);
            curl_setopt($curl, CURLOPT_CUSTOMREQUEST, 'PUT');
            curl_setopt($curl, CURLOPT_POSTFIELDS, $params);
        } else if ($method == 'DEL') {
            curl_setopt($curl, CURLOPT_CUSTOMREQUEST, "DELETE");
        }
        curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);
        curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($curl, CURLOPT_URL, $api_url);
        curl_setopt($curl, CURLOPT_HEADER, false);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($curl, CURLOPT_FOLLOWLOCATION, 1);
        $response = curl_exec($curl);
        $err = curl_error($curl);
        curl_close($curl);
        return $response;
    }

    public function loginSSO(Request $request){

        $verify_url = env('URL_CSCART').'index.php?dispatch=sso.verify';

        $res = Http::post($verify_url, [
            "token" => $request->token,
            "verify" => $request->verify
        ]);

        $data = $res->json();

        if(!empty($data)){

            $user = User::where('email', $data['data']['email'])->first();

            if($user){
                Auth::login($user);
                return redirect('/');
            }else{
                $new_user = User::create([
                    'name' =>  $data['data']['firstname'].' '.$data['data']['lastname'],
                    'email' => $data['data']['email'],
                    'password' => Hash::make($data['data']['email'])
                ]);
                Auth::login($new_user);
                return redirect('/');
            }

        }else{
            return redirect()->route('login')->with('status', 'User not exist!');
        }

    }

    public function importProducts(Request $request){
        $this->validate($request, [
            'file' => 'required|file|mimes:xls,xlsx'
        ]);
        $path = $request->file('file')->getRealPath();
        /*$spreadsheet = IOFactory::load($the_file->getRealPath());
        $sheet        = $spreadsheet->getActiveSheet();
        $row_limit    = $sheet->getHighestDataRow();
        $column_limit = $sheet->getHighestDataColumn();
        $row_range    = range( 3, $row_limit );
        $startcount = 3;
        $data = array();
        foreach ( $row_range as $row ) {
            $data[] = [$sheet->getCell( 'A' . $row )->getValue()];
            $startcount++;
        }*/
        $data = Excel::toArray([],$path);
        if(!empty($data[0])) {
            $data = $data[0];
            unset($data[0]);
            unset($data[1]);
            foreach ($data as $key => $value) {
                if(empty($value[0])) {
                    unset($data[$key]);
                }
            }
        }
        $product_data = [];
        $excel_data = [];
        if(!empty($data)) {
            $error = false;
            foreach ($data as $product) {
                $api_url = env('URL_CSCART').'api/products?status[]=A&company_info=1&only_vendor_product=1&pcode_from_q=Y&pcode='.$product[0];
                $response = $this->call_api_get_product_import($api_url);
                if(!empty($response)) {
                    $response = json_decode($response);
                    $p = current($response->products);
                    if(!empty($p)) {
                        $product_data[] = $p;
                        $excel_data[$product[0]]['code'] = $product[0];
                        $excel_data[$product[0]]['error'] = '';
                    } else {
                        $error = true;
                        $excel_data[$product[0]]['code'] = $product[0];
                        $excel_data[$product[0]]['error'] = 'SSKU '.$product[0].' không tìm thấy hoặc không đủ điều kiện khuyến mãi, vui lòng kiểm tra lại!';
                    }
                }
            }
            if($error) {
                $time = Carbon::now()->toArray();
                $file = 'template_import_products_to_campaign_'.$time['timestamp'].'.xlsx';
                $spreadsheet = new Spreadsheet();
                $spreadsheet->getProperties()->setCreator('Hoang Vu')
                    ->setLastModifiedBy('Hoang Vu')
                    ->setTitle('Office 2007 XLSX Test Document')
                    ->setSubject('Office 2007 XLSX Test Document')
                    ->setDescription('Test document for Office 2007 XLSX, generated using PHP classes.')
                    ->setKeywords('office 2007 openxml php')
                    ->setCategory('Import Complete File');
                $spreadsheet->getActiveSheet()->getColumnDimension('A')->setWidth(30);
                $spreadsheet->getActiveSheet()->getColumnDimension('B')->setWidth(90);
                $spreadsheet->getActiveSheet()->getRowDimension(2)->setRowHeight(40);

                $active_sheet = $spreadsheet->setActiveSheetIndex(0);
                $active_sheet
                    ->getStyle('A2')
                    ->getFill()
                    ->setFillType(Fill::FILL_SOLID)
                    ->getStartColor()
                    ->setARGB('E4EDDC');
                $styleArray = [
                    'font'      => [
                        'bold' => true,
                    ],
                    'alignment' => [
                        'vertical'   => Alignment::VERTICAL_CENTER,
                        'horizontal' => Alignment::HORIZONTAL_CENTER,
                    ],
                ];
                $active_sheet->getStyle('A2')->applyFromArray($styleArray);
                $active_sheet->getStyle('A1')->getFont()->setColor(new Color(Color::COLOR_RED));
                $active_sheet->getStyle('A2')->getFont()->setColor(new Color(Color::COLOR_RED));
                $active_sheet
                    ->setCellValue('A1', '* Bắt buộc')
                    ->setCellValue('A2', 'Mã sản phẩm (SSKU)');
                $row = 3;
                foreach ($excel_data as $data) {
                    $active_sheet
                        ->setCellValue('A'.$row, $data['code'])
                        ->setCellValue('B'.$row, $data['error']);
                    $row++;
                }
                $spreadsheet->getActiveSheet()->setTitle('CAT_FEATURES');
                $spreadsheet->setActiveSheetIndex(0);
                header('Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
                header('Content-Disposition: attachment;filename='.$file);
                header('Cache-Control: max-age=0');
                header('Cache-Control: max-age=1');
                header('Expires: Mon, 26 Jul 1997 05:00:00 GMT'); // Date in the past
                header('Last-Modified: ' . gmdate('D, d M Y H:i:s') . ' GMT'); // always modified
                header('Cache-Control: cache, must-revalidate'); // HTTP/1.1
                header('Pragma: public'); // HTTP/1.0

                $writer = new Xlsx($spreadsheet);
                $writer->save(public_path('storage/').$file);
                return [
                    'status' => 300,
                    'file' => $file
                ];
            }
        }
        return [
            'status' => 200,
            'data' => $product_data
        ];
    }

    public function call_api_get_product_import($api_url) {
        $headers = array(
            "Authorization: Basic YWRtaW5AdGF0bWFydC5jb206bGJyNXliNjdZNTh5OFNjMDFwR0QxNGIxa0pHMDgyeTQ=="
        );
        $curl = curl_init();
        curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);
        curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($curl, CURLOPT_URL, $api_url);
        curl_setopt($curl, CURLOPT_HEADER, false);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($curl, CURLOPT_FOLLOWLOCATION, 1);
        $response = curl_exec($curl);
        $err = curl_error($curl);
        curl_close($curl);
        return $response;
    }


}
