<?php

$name = $_POST['name'];
$email= $_POST['email'];
$message= $_POST['message'];
$number= $_POST['number'];

$to = "rjrogerz@gmail.com";

$subject = "Mail From Rog Solutions";
$txt ="Name = ". $name . "\r\nEmail = " . $email . "\r\nNumber = " . $number . "\r\nMessage = " . $message;
$headers = "From: noreply@rogsolutions.co.uk" . "\r\n" .
"CC: rjrogerz@rogsolutions.co.uk";
if($email!=NULL){
    mail($to,$subject,$txt,$headers);
}

header("Location:../index.html#contact");

?>