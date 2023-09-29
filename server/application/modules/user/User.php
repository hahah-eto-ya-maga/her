<?php

class User {
    public DB $db;

    function __construct($db){
        $this->db = $db;
    }

    function login($login, $password): array {
        if ($login === 'bogdan' && $password === '123456') {
            return array('name' => 'Bogdan', 'surname' => 'Pupkin', 'id' => 12);
        }
        return array(false, 1001);
    }
}