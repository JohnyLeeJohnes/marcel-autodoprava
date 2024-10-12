<?php

namespace App\Mapper;

use App\Entity\Translation;

class TranslationMapper extends AbstractMapper
{
    /**
     * @param Translation $item
     * @param string $locale
     * @return array
     */
    public function toArray($item, string $locale): array
    {
        return [
            'key'         => $item->getMessageKey(),
            'translation' => $item->getMessageTranslation(),
        ];
    }
}