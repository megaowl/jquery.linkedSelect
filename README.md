jQuery linkedSelect

Простой плагин для связки двух select'ов.
Когда меняется один select, отправляется ajax запрос на определенный URL,
в ответ приходят новые опции для второго select'a в формате JSON.

Опции:
with - ID второго select'a
path - URL адрес, на который будет отправляться запрос
attr - имя поля в массиве POST, в котором будет отправляться текущее значение первого select'a
default - спец. опция, позволяет дернуть change при document.ready и выставить option selected для второго select
triggerOnInit - флаг, который определяет, дергать ли change при document.ready

Использование:

1. регистрируем js
<?php
Yii::app()->clientScript->registerScriptFile(
    Yii::app()->createAbsoluteUrl('/protected/vendors/jquery.scripts/jquery.linkedSelect.js')
);
?>

2. вешаем на первый select плагин 
<script type="text/javascript">
    $(function(){
        $("#resort-id").linkedSelect({
            'with'    : 'area-id',
            'path'  : '<?= Yii::app()->createAbsoluteUrl('/admin/tours/resorts/ajaxGetAreas'); ?>',
            'default' : <?= $oTourObject->area_id; ?>
        });
    });
</script>

3. пример action для контроллера
<?php
public function actionAjaxGetAreas(){
    if(false === Yii::app()->getRequest()->getIsAjaxRequest()
        || (int)Yii::app()->getRequest()->getParam('id') === 0
    ){
        Yii::app()->end();
    }

    $aAreas = array(0 => 'По умолчанию');
    $id = Yii::app()->getRequest()->getParam('id');
    $oResort = TourResort::model()->findByPk($id);

    if($oResort !== null && !empty($oResort->jsonAreas)){
        $aAreas = (array)json_decode($oResort->jsonAreas, true);
    }

    echo json_encode($aAreas);
    Yii::app()->end();
}
?>
