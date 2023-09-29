<?php

require("modules/db/DB.php");
require("modules/user/User.php");
require("modules/chat/Chat.php");

class Application {
    public User $user;
    public Chat $chat;

    function __construct(){
        $db = new DB();
        $this->user = new User($db);
        $this->chat = new Chat($db);
    }

    function login($params): ?array {
        $login = $params['login'];
        $password = $params['password'];
        If ($login && $password) {
            return $this->user->login($login, $password);
        }
        return array(false, 1001); // В Answer прописать что за ошибка.
    }

}