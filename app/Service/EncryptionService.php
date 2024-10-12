<?php

namespace App\Service;

class EncryptionService
{
    public const ENCRYPTION_METHOD = "aes-256-ctr";
    public const PASSPHRASE = "d41d8cd98f00b204e9800998ecf8427e";

    /**
     * Encrypt string message
     * @param string $message
     * @return string|bool
     */
    public function encryptMessage(string $message)
    {
        return openssl_encrypt($message, self::ENCRYPTION_METHOD, self::PASSPHRASE);
    }

    /**
     * Decrypt encrypted message
     * @param string $encryptedMessage
     * @return string|bool
     */
    public function decryptMessage(string $encryptedMessage)
    {
        return openssl_decrypt($encryptedMessage, self::ENCRYPTION_METHOD, self::PASSPHRASE);
    }
}