<?php

namespace App\Entity;

use Ramsey\Uuid\Uuid;
use ReflectionClass;

abstract class AbstractEntity
{
    /** @var $id ?string */
    protected $id;

    /**
     * @param $input
     * @param bool $generateId
     * @return static
     * @noinspection PhpMissingReturnTypeInspection
     */
    public static function bind($input, bool $generateId = true)
    {
        $entity = new static();
        $refClass = new ReflectionClass($entity);
        foreach ($refClass->getProperties() as $prop) {
            if (is_array($input)) {
                if (isset($input[$prop->getName()])) {
                    $setter = "set" . ucwords($prop->getName());
                    $entity->$setter($input[$prop->getName()]);
                }
            } else {
                if (isset($input->{$prop->getName()})) {
                    $setter = "set" . ucwords($prop->getName());
                    $entity->$setter($input->{$prop->getName()});
                }
            }
        }
        if ($generateId) {
            $entity->setId(Uuid::uuid6()->toString());
        }
        return $entity;
    }

    #region Get & Set

    /**
     * @return string|null
     */
    public function getId(): ?string
    {
        return $this->id;
    }

    /**
     * @param string|null $id
     * @return AbstractEntity
     */
    public function setId(?string $id): AbstractEntity
    {
        $this->id = $id;
        return $this;
    }

    #endregion
}