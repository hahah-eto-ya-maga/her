<?php

class Chat {
    public DB $db;

    function __construct($db){
        $this->db = $db;
    }
}