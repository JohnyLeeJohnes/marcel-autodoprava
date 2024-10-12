<?php

namespace App\Repository;

use App\Entity\AbstractEntity;
use App\Support\JoinMap;
use ClanCats\Hydrahon\Builder;
use ClanCats\Hydrahon\Query\Sql\Select;
use ClanCats\Hydrahon\Query\Sql\Table;
use Dibi\Connection;
use Dibi\Exception;
use Monolog\Logger;
use ReflectionClass;

abstract class AbstractRepository
{
    protected $app;

    /** @var $table Table */
    protected $table;

    /** @var $connection Connection */
    protected $connection;

    /** @var $builder Builder */
    protected $builder;

    /** @var $entityClass AbstractEntity */
    protected $entityClass;

    /** @var $mapping array */
    protected $mapping;

    /** @var $joins JoinMap[] */
    protected $joins;

    /**
     * @param $app
     * @param $entityClass
     */
    public function __construct($app, $entityClass = null)
    {
        $this->app = $app;
        $this->entityClass = $entityClass;
        $this->connection = $this->app->getContainer()->get(Connection::class);
        $this->builder = $this->app->getContainer()->get(Builder::class);
    }

    #region INSERT methods

    /**
     * @param $entity
     * @return void
     * @throws Exception
     */
    public function insert($entity): void
    {
        //Prepare insert properties
        $refClass = new ReflectionClass(get_class($entity));
        foreach ($refClass->getProperties() as $prop) {
            if ($prop->class === AbstractEntity::class || $prop->class === get_class($entity)) {
                $getter = "get" . ucwords($prop->getName());
                $insertProps[$prop->getName()] = $entity->$getter();
            }
        }

        //Insert Entity to DB and return ID
        $this->table->insert($insertProps ?? [])->execute();
    }

    /**
     * @param array $props
     * @throws Exception
     */
    public function insertCustom(array $props): void
    {
        try {
            $this->table->insert($props)->execute();
        } catch (\Exception $e) {
            /** @var Logger $logger */
            $logger = app()->getContainer()->get(Logger::class);
            $logger->error($e->getMessage());
        }
    }

    #endregion

    #region SELECT methods

    /**
     * Create query builder for Select
     * @return Select
     */
    public function createQueryBuilder(): ?Select
    {
        try {
            //IF mapping exsits
            if (empty($this->mapping)) {
                return null;
            }
            $select = $this->table->select($this->mapping);

            //Join tables
            if (!empty($this->joins)) {
                foreach ($this->joins as $join) {
                    $select = $select->join($join->table, $join->key, $join->operator, $join->foreginKey);
                }
            }
            return $select;
        } catch (\Exception $e) {
            /** @var Logger $logger */
            $logger = app()->getContainer()->get(Logger::class);
            $logger->error($e->getMessage());
            return null;
        }
    }

    /**
     * @param Select $query
     * @return Object
     */
    public function executeSingleBuilder(Select $query): ?object
    {
        return $this->bindSingleEntity($query->limit(1)->execute()->fetch());
    }

    /**
     * @param Select $query
     * @param bool $bindEntity
     * @return mixed
     */
    public function executeBuilder(Select $query, bool $bindEntity = true)
    {
        return $bindEntity
            ? $this->bindEntity($query->execute()->fetchAll())
            : $query->execute()->fetchAll();
    }

    /**
     * @return array|null
     */
    public function findAll(): ?array
    {
        return $this->bindEntity($this->table->select()->execute()->fetchAll());
    }

    /**
     * @param array $conditions
     * @param string|null $orderBy
     * @param string $direction
     * @return array|null
     * @throws \ClanCats\Hydrahon\Query\Sql\Exception
     */
    public function findBy(array $conditions, string $orderBy = null, string $direction = 'ASC'): ?array
    {
        $tableSelect = $this->table->select();
        foreach ($conditions as $key => $value) {
            $tableSelect->where($key, $value);
        }

        if ($orderBy) {
            $tableSelect->orderBy($orderBy, $direction);
        }

        return $this->bindEntity($tableSelect->execute()->fetchAll());
    }

    /**
     * @param array $conditions
     * @return AbstractEntity|mixed
     * @throws \ClanCats\Hydrahon\Query\Sql\Exception
     */
    public function findOneBy(array $conditions)
    {
        $tableSelect = $this->table->select();
        foreach ($conditions as $key => $value) {
            $tableSelect->where($key, $value);
        }
        return $this->bindSingleEntity($tableSelect->limit(1)->execute()->fetch());
    }

    /**
     * @param $value
     * @param string $idName
     * @return Object
     * @throws \ClanCats\Hydrahon\Query\Sql\Exception
     */
    public function findOneById($value, string $idName = 'id'): ?object
    {
        return $this->bindSingleEntity($this->table->select()->where($idName, $value)->limit(1)->execute()->fetch());
    }

    #endregion

    #region Helper Methods

    protected function bindEntity(array $result): array
    {
        if ($this->entityClass) {
            return collect($result)->map(function ($item) {
                return $this->entityClass::bind($item, false);
            })->toArray() ?? [];
        }
        return $result;
    }


    protected function bindSingleEntity($result)
    {
        if ($this->entityClass) {
            if ($result) {
                return $this->entityClass::bind($result, false);
            }
            return null;
        }
        return $result;
    }

    #endregion
}