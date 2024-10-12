<?php

namespace App\Entity;

class Translation extends AbstractEntity
{
    /** @var $messageKey string */
    protected $messageKey;

    /** @var $messageTranslation string */
    protected $messageTranslation;

    /** @var $localeId string */
    protected $localeId;

    #region Get & Set

    public function getMessageKey(): string
    {
        return $this->messageKey;
    }

    public function setMessageKey(string $messageKey): void
    {
        $this->messageKey = $messageKey;
    }

    public function getMessageTranslation(): string
    {
        return $this->messageTranslation;
    }

    public function setMessageTranslation(string $messageTranslation): void
    {
        $this->messageTranslation = $messageTranslation;
    }

    public function getLocaleId(): string
    {
        return $this->localeId;
    }

    public function setLocaleId(string $localeId): void
    {
        $this->localeId = $localeId;
    }

    #endregion
}