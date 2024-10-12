<?php
/** @noinspection PhpUnused */

/** @noinspection PhpUnusedParameterInspection */

namespace App\Http\Controllers;

use App\Mapper\TranslationMapper;
use App\Repository\TranslationRepository;
use App\Support\Response;
use ClanCats\Hydrahon\Query\Sql\Exception;
use JsonException;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

class ConfigurationController extends AbstractController
{
    /**
     * @param ServerRequestInterface $request
     * @param ResponseInterface $response
     * @return ResponseInterface
     * @throws JsonException
     */
    public function fetchConfiguration(ServerRequestInterface $request, ResponseInterface $response): ResponseInterface
    {
        return Response::withJson($response, [
            'defaultLocale' => 'de-DE',
            'locale'        => [
//                [
//                    'label'          => 'English',
//                    'locale'         => 'en-GB',
//                    'countryCode'    => "gb",
//                    'msatCookieCode' => "en",
//                ],
                [
                    'label'          => 'Deutsch',
                    'locale'         => 'de-DE',
                    'countryCode'    => 'de',
                    'msatCookieCode' => 'de',
                ],
                [
                    'label'          => 'Show translations',
                    'locale'         => '-',
                    'countryCode'    => '-',
                    'msatCookieCode' => '-',
                ],
            ],
        ]);
    }

    /**
     * @param ServerRequestInterface $request
     * @param ResponseInterface $response
     * @return ResponseInterface
     * @throws JsonException
     * @throws Exception
     */
    public function fetchTranslations(ServerRequestInterface $request, ResponseInterface $response): ResponseInterface
    {
        /** @var TranslationRepository $translationRepository */
        $translationRepository = app()->getContainer()->get(TranslationRepository::class);
        /** @var TranslationMapper $translationMapper */
        $translationMapper = app()->getContainer()->get(TranslationMapper::class);

        $data['de-DE'] = $translationMapper->map($translationRepository->findBy(['localeId' => 'de-DE']));
        $data['en-GB'] = $translationMapper->map($translationRepository->findBy(['localeId' => 'en-GB']));
        return Response::withJson($response, ['john-deere' => $data] ?? []);
    }
}