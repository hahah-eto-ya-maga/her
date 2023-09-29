<?php

class Answer {
    static $CODES = array(
        '400' => 'not found param method',
        '401' => 'not found method',
        '404' => 'not found',
        '1001' => 'Неверный логин или пароль',
        '9000' => 'unknown error'
    );

    static function response($result = null): array {
        if ($result) {
            if (count($result) == 2 && !$result[0]) {
                $code = $result[1];
                return array(
                    'result' => 'error',
                    'error' => array(
                        'code' => $code,
                        'text' => self::$CODES[$code]
                    )
                );
            }
            return array(
                'result' => 'ok',
                'data' => $result
            );
        }
        $code = 9000;
        return array(
            'result' => 'error',
            'error' => array(
                'code' => $code,
                'text' => self::$CODES[$code]
            )
        );
    }
}