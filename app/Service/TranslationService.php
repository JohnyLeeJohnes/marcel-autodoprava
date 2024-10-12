<?php

namespace App\Service;

use App\Entity\Translation;
use App\Repository\TranslationRepository;

class TranslationService
{
    /** @var TranslationRepository $translationRepository */
    private $translationRepository;

    public function __construct()
    {
        $this->translationRepository = app()->getContainer()->get(TranslationRepository::class);
    }

    /**
     * Translate string
     * @param string $text
     * @param string $locale
     * @return string
     */
    public function translate(string $text, string $locale = 'cs-CZ'): string
    {
        /** @var  $translation Translation */
        $translation = $this->translationRepository->findAll();
        if ($translation) {
            return $translation->getMessageTranslation();
        }
        return $text;
    }
}