<pre>jQuery linkedSelect

Простой плагин для связки двух select'ов.
Когда меняется один select, отправляется ajax запрос на определенный URL,
в ответ приходят новые опции для второго select'a в формате JSON.

Опции:
with - ID второго select'a
path - URL адрес, на который будет отправляться запрос
attr - имя поля в массиве POST, в котором будет отправляться текущее значение первого select'a
default - спец. опция, позволяет дернуть change при document.ready и выставить option selected для второго select
triggerOnInit - флаг, который определяет, дергать ли change при document.ready

</pre>
