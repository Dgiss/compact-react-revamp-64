/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateCompany = /* GraphQL */ `
  subscription OnCreateCompany($filter: ModelSubscriptionCompanyFilterInput) {
    onCreateCompany(filter: $filter) {
      id
      name
      siret
      address
      postalCode
      city
      countryCode
      contact
      email
      mobile
      phone
      fax
      creationDate
      subscriptionDate
      keyedStart
      users {
        items {
          sub
          firstname
          lastname
          mobile
          beginDate
          endDate
          mappingId
          languageCode
          lastModificationDate
          showReport
          dispatcher
          applicationVersion
          themeId
          picture {
            bucket
            region
            key
            __typename
          }
          companyUsersId
          company {
            id
            name
            siret
            address
            postalCode
            city
            countryCode
            contact
            email
            mobile
            phone
            fax
            creationDate
            subscriptionDate
            keyedStart
            createdAt
            updatedAt
            __typename
          }
          createdAt
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      vehicles {
        items {
          immat
          year
          fuelType
          consumption
          maxSpeed
          seatCount
          icon
          picture {
            bucket
            region
            key
            __typename
          }
          kilometerage
          kilometerPrice
          kilometerageStart
          kilometerageDay
          kilometerageLastUpdate
          timeRunning
          counterValue
          co2
          lastModificationDate
          rollingTimeStart
          rollingTimeDay
          locations
          installationPrecautions
          code
          vehicleCategory {
            id
            category
            description
            createdAt
            updatedAt
            __typename
          }
          brand {
            brandName
            createdAt
            updatedAt
            __typename
          }
          modele {
            id
            modele
            createdAt
            updatedAt
            vehicleBrandModelsBrandName
            __typename
          }
          gefcoSend
          tankCapacity
          canMileage
          companyVehiclesId
          company {
            id
            name
            siret
            address
            postalCode
            city
            countryCode
            contact
            email
            mobile
            phone
            fax
            creationDate
            subscriptionDate
            keyedStart
            createdAt
            updatedAt
            __typename
          }
          device {
            imei
            protocolId
            sim
            createdAt
            updatedAt
            deviceVehicleImmat
            __typename
          }
          alerts {
            nextToken
            __typename
          }
          tags {
            nextToken
            __typename
          }
          createdAt
          updatedAt
          vehicleVehicleCategoryId
          vehicleBrandBrandName
          vehicleModeleId
          vehicleDeviceImei
          __typename
        }
        nextToken
        __typename
      }
      drivers {
        items {
          sub
          firstname
          lastname
          fullname
          birthDate
          drivingLicenseNumber
          drivingLicenseType
          job
          hiringDate
          comment
          driverKey
          email
          mobile
          lastModificationDate
          code
          address
          agencyId
          cdc
          pdm
          nni
          companyDriversId
          company {
            id
            name
            siret
            address
            postalCode
            city
            countryCode
            contact
            email
            mobile
            phone
            fax
            creationDate
            subscriptionDate
            keyedStart
            createdAt
            updatedAt
            __typename
          }
          createdAt
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      trames {
        items {
          id
          speed
          lat
          lng
          address
          azimut
          immobilisation
          timestamp
          state
          fuel
          ibuttonCode
          companyId
          driverFullName
          vehicleBrandName
          companyTramesId
          company {
            id
            name
            siret
            address
            postalCode
            city
            countryCode
            contact
            email
            mobile
            phone
            fax
            creationDate
            subscriptionDate
            keyedStart
            createdAt
            updatedAt
            __typename
          }
          driver {
            sub
            firstname
            lastname
            fullname
            birthDate
            drivingLicenseNumber
            drivingLicenseType
            job
            hiringDate
            comment
            driverKey
            email
            mobile
            lastModificationDate
            code
            address
            agencyId
            cdc
            pdm
            nni
            companyDriversId
            createdAt
            updatedAt
            __typename
          }
          vehicle {
            immat
            year
            fuelType
            consumption
            maxSpeed
            seatCount
            icon
            kilometerage
            kilometerPrice
            kilometerageStart
            kilometerageDay
            kilometerageLastUpdate
            timeRunning
            counterValue
            co2
            lastModificationDate
            rollingTimeStart
            rollingTimeDay
            locations
            installationPrecautions
            code
            gefcoSend
            tankCapacity
            canMileage
            companyVehiclesId
            createdAt
            updatedAt
            vehicleVehicleCategoryId
            vehicleBrandBrandName
            vehicleModeleId
            vehicleDeviceImei
            __typename
          }
          processor
          createdAt
          updatedAt
          trameDriverSub
          trameVehicleImmat
          __typename
        }
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateCompany = /* GraphQL */ `
  subscription OnUpdateCompany($filter: ModelSubscriptionCompanyFilterInput) {
    onUpdateCompany(filter: $filter) {
      id
      name
      siret
      address
      postalCode
      city
      countryCode
      contact
      email
      mobile
      phone
      fax
      creationDate
      subscriptionDate
      keyedStart
      users {
        items {
          sub
          firstname
          lastname
          mobile
          beginDate
          endDate
          mappingId
          languageCode
          lastModificationDate
          showReport
          dispatcher
          applicationVersion
          themeId
          picture {
            bucket
            region
            key
            __typename
          }
          companyUsersId
          company {
            id
            name
            siret
            address
            postalCode
            city
            countryCode
            contact
            email
            mobile
            phone
            fax
            creationDate
            subscriptionDate
            keyedStart
            createdAt
            updatedAt
            __typename
          }
          createdAt
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      vehicles {
        items {
          immat
          year
          fuelType
          consumption
          maxSpeed
          seatCount
          icon
          picture {
            bucket
            region
            key
            __typename
          }
          kilometerage
          kilometerPrice
          kilometerageStart
          kilometerageDay
          kilometerageLastUpdate
          timeRunning
          counterValue
          co2
          lastModificationDate
          rollingTimeStart
          rollingTimeDay
          locations
          installationPrecautions
          code
          vehicleCategory {
            id
            category
            description
            createdAt
            updatedAt
            __typename
          }
          brand {
            brandName
            createdAt
            updatedAt
            __typename
          }
          modele {
            id
            modele
            createdAt
            updatedAt
            vehicleBrandModelsBrandName
            __typename
          }
          gefcoSend
          tankCapacity
          canMileage
          companyVehiclesId
          company {
            id
            name
            siret
            address
            postalCode
            city
            countryCode
            contact
            email
            mobile
            phone
            fax
            creationDate
            subscriptionDate
            keyedStart
            createdAt
            updatedAt
            __typename
          }
          device {
            imei
            protocolId
            sim
            createdAt
            updatedAt
            deviceVehicleImmat
            __typename
          }
          alerts {
            nextToken
            __typename
          }
          tags {
            nextToken
            __typename
          }
          createdAt
          updatedAt
          vehicleVehicleCategoryId
          vehicleBrandBrandName
          vehicleModeleId
          vehicleDeviceImei
          __typename
        }
        nextToken
        __typename
      }
      drivers {
        items {
          sub
          firstname
          lastname
          fullname
          birthDate
          drivingLicenseNumber
          drivingLicenseType
          job
          hiringDate
          comment
          driverKey
          email
          mobile
          lastModificationDate
          code
          address
          agencyId
          cdc
          pdm
          nni
          companyDriversId
          company {
            id
            name
            siret
            address
            postalCode
            city
            countryCode
            contact
            email
            mobile
            phone
            fax
            creationDate
            subscriptionDate
            keyedStart
            createdAt
            updatedAt
            __typename
          }
          createdAt
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      trames {
        items {
          id
          speed
          lat
          lng
          address
          azimut
          immobilisation
          timestamp
          state
          fuel
          ibuttonCode
          companyId
          driverFullName
          vehicleBrandName
          companyTramesId
          company {
            id
            name
            siret
            address
            postalCode
            city
            countryCode
            contact
            email
            mobile
            phone
            fax
            creationDate
            subscriptionDate
            keyedStart
            createdAt
            updatedAt
            __typename
          }
          driver {
            sub
            firstname
            lastname
            fullname
            birthDate
            drivingLicenseNumber
            drivingLicenseType
            job
            hiringDate
            comment
            driverKey
            email
            mobile
            lastModificationDate
            code
            address
            agencyId
            cdc
            pdm
            nni
            companyDriversId
            createdAt
            updatedAt
            __typename
          }
          vehicle {
            immat
            year
            fuelType
            consumption
            maxSpeed
            seatCount
            icon
            kilometerage
            kilometerPrice
            kilometerageStart
            kilometerageDay
            kilometerageLastUpdate
            timeRunning
            counterValue
            co2
            lastModificationDate
            rollingTimeStart
            rollingTimeDay
            locations
            installationPrecautions
            code
            gefcoSend
            tankCapacity
            canMileage
            companyVehiclesId
            createdAt
            updatedAt
            vehicleVehicleCategoryId
            vehicleBrandBrandName
            vehicleModeleId
            vehicleDeviceImei
            __typename
          }
          processor
          createdAt
          updatedAt
          trameDriverSub
          trameVehicleImmat
          __typename
        }
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteCompany = /* GraphQL */ `
  subscription OnDeleteCompany($filter: ModelSubscriptionCompanyFilterInput) {
    onDeleteCompany(filter: $filter) {
      id
      name
      siret
      address
      postalCode
      city
      countryCode
      contact
      email
      mobile
      phone
      fax
      creationDate
      subscriptionDate
      keyedStart
      users {
        items {
          sub
          firstname
          lastname
          mobile
          beginDate
          endDate
          mappingId
          languageCode
          lastModificationDate
          showReport
          dispatcher
          applicationVersion
          themeId
          picture {
            bucket
            region
            key
            __typename
          }
          companyUsersId
          company {
            id
            name
            siret
            address
            postalCode
            city
            countryCode
            contact
            email
            mobile
            phone
            fax
            creationDate
            subscriptionDate
            keyedStart
            createdAt
            updatedAt
            __typename
          }
          createdAt
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      vehicles {
        items {
          immat
          year
          fuelType
          consumption
          maxSpeed
          seatCount
          icon
          picture {
            bucket
            region
            key
            __typename
          }
          kilometerage
          kilometerPrice
          kilometerageStart
          kilometerageDay
          kilometerageLastUpdate
          timeRunning
          counterValue
          co2
          lastModificationDate
          rollingTimeStart
          rollingTimeDay
          locations
          installationPrecautions
          code
          vehicleCategory {
            id
            category
            description
            createdAt
            updatedAt
            __typename
          }
          brand {
            brandName
            createdAt
            updatedAt
            __typename
          }
          modele {
            id
            modele
            createdAt
            updatedAt
            vehicleBrandModelsBrandName
            __typename
          }
          gefcoSend
          tankCapacity
          canMileage
          companyVehiclesId
          company {
            id
            name
            siret
            address
            postalCode
            city
            countryCode
            contact
            email
            mobile
            phone
            fax
            creationDate
            subscriptionDate
            keyedStart
            createdAt
            updatedAt
            __typename
          }
          device {
            imei
            protocolId
            sim
            createdAt
            updatedAt
            deviceVehicleImmat
            __typename
          }
          alerts {
            nextToken
            __typename
          }
          tags {
            nextToken
            __typename
          }
          createdAt
          updatedAt
          vehicleVehicleCategoryId
          vehicleBrandBrandName
          vehicleModeleId
          vehicleDeviceImei
          __typename
        }
        nextToken
        __typename
      }
      drivers {
        items {
          sub
          firstname
          lastname
          fullname
          birthDate
          drivingLicenseNumber
          drivingLicenseType
          job
          hiringDate
          comment
          driverKey
          email
          mobile
          lastModificationDate
          code
          address
          agencyId
          cdc
          pdm
          nni
          companyDriversId
          company {
            id
            name
            siret
            address
            postalCode
            city
            countryCode
            contact
            email
            mobile
            phone
            fax
            creationDate
            subscriptionDate
            keyedStart
            createdAt
            updatedAt
            __typename
          }
          createdAt
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      trames {
        items {
          id
          speed
          lat
          lng
          address
          azimut
          immobilisation
          timestamp
          state
          fuel
          ibuttonCode
          companyId
          driverFullName
          vehicleBrandName
          companyTramesId
          company {
            id
            name
            siret
            address
            postalCode
            city
            countryCode
            contact
            email
            mobile
            phone
            fax
            creationDate
            subscriptionDate
            keyedStart
            createdAt
            updatedAt
            __typename
          }
          driver {
            sub
            firstname
            lastname
            fullname
            birthDate
            drivingLicenseNumber
            drivingLicenseType
            job
            hiringDate
            comment
            driverKey
            email
            mobile
            lastModificationDate
            code
            address
            agencyId
            cdc
            pdm
            nni
            companyDriversId
            createdAt
            updatedAt
            __typename
          }
          vehicle {
            immat
            year
            fuelType
            consumption
            maxSpeed
            seatCount
            icon
            kilometerage
            kilometerPrice
            kilometerageStart
            kilometerageDay
            kilometerageLastUpdate
            timeRunning
            counterValue
            co2
            lastModificationDate
            rollingTimeStart
            rollingTimeDay
            locations
            installationPrecautions
            code
            gefcoSend
            tankCapacity
            canMileage
            companyVehiclesId
            createdAt
            updatedAt
            vehicleVehicleCategoryId
            vehicleBrandBrandName
            vehicleModeleId
            vehicleDeviceImei
            __typename
          }
          processor
          createdAt
          updatedAt
          trameDriverSub
          trameVehicleImmat
          __typename
        }
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser($filter: ModelSubscriptionUserFilterInput) {
    onCreateUser(filter: $filter) {
      sub
      firstname
      lastname
      mobile
      beginDate
      endDate
      mappingId
      languageCode
      lastModificationDate
      showReport
      dispatcher
      applicationVersion
      themeId
      picture {
        bucket
        region
        key
        __typename
      }
      companyUsersId
      company {
        id
        name
        siret
        address
        postalCode
        city
        countryCode
        contact
        email
        mobile
        phone
        fax
        creationDate
        subscriptionDate
        keyedStart
        users {
          items {
            sub
            firstname
            lastname
            mobile
            beginDate
            endDate
            mappingId
            languageCode
            lastModificationDate
            showReport
            dispatcher
            applicationVersion
            themeId
            companyUsersId
            createdAt
            updatedAt
            __typename
          }
          nextToken
          __typename
        }
        vehicles {
          items {
            immat
            year
            fuelType
            consumption
            maxSpeed
            seatCount
            icon
            kilometerage
            kilometerPrice
            kilometerageStart
            kilometerageDay
            kilometerageLastUpdate
            timeRunning
            counterValue
            co2
            lastModificationDate
            rollingTimeStart
            rollingTimeDay
            locations
            installationPrecautions
            code
            gefcoSend
            tankCapacity
            canMileage
            companyVehiclesId
            createdAt
            updatedAt
            vehicleVehicleCategoryId
            vehicleBrandBrandName
            vehicleModeleId
            vehicleDeviceImei
            __typename
          }
          nextToken
          __typename
        }
        drivers {
          items {
            sub
            firstname
            lastname
            fullname
            birthDate
            drivingLicenseNumber
            drivingLicenseType
            job
            hiringDate
            comment
            driverKey
            email
            mobile
            lastModificationDate
            code
            address
            agencyId
            cdc
            pdm
            nni
            companyDriversId
            createdAt
            updatedAt
            __typename
          }
          nextToken
          __typename
        }
        trames {
          items {
            id
            speed
            lat
            lng
            address
            azimut
            immobilisation
            timestamp
            state
            fuel
            ibuttonCode
            companyId
            driverFullName
            vehicleBrandName
            companyTramesId
            processor
            createdAt
            updatedAt
            trameDriverSub
            trameVehicleImmat
            __typename
          }
          nextToken
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser($filter: ModelSubscriptionUserFilterInput) {
    onUpdateUser(filter: $filter) {
      sub
      firstname
      lastname
      mobile
      beginDate
      endDate
      mappingId
      languageCode
      lastModificationDate
      showReport
      dispatcher
      applicationVersion
      themeId
      picture {
        bucket
        region
        key
        __typename
      }
      companyUsersId
      company {
        id
        name
        siret
        address
        postalCode
        city
        countryCode
        contact
        email
        mobile
        phone
        fax
        creationDate
        subscriptionDate
        keyedStart
        users {
          items {
            sub
            firstname
            lastname
            mobile
            beginDate
            endDate
            mappingId
            languageCode
            lastModificationDate
            showReport
            dispatcher
            applicationVersion
            themeId
            companyUsersId
            createdAt
            updatedAt
            __typename
          }
          nextToken
          __typename
        }
        vehicles {
          items {
            immat
            year
            fuelType
            consumption
            maxSpeed
            seatCount
            icon
            kilometerage
            kilometerPrice
            kilometerageStart
            kilometerageDay
            kilometerageLastUpdate
            timeRunning
            counterValue
            co2
            lastModificationDate
            rollingTimeStart
            rollingTimeDay
            locations
            installationPrecautions
            code
            gefcoSend
            tankCapacity
            canMileage
            companyVehiclesId
            createdAt
            updatedAt
            vehicleVehicleCategoryId
            vehicleBrandBrandName
            vehicleModeleId
            vehicleDeviceImei
            __typename
          }
          nextToken
          __typename
        }
        drivers {
          items {
            sub
            firstname
            lastname
            fullname
            birthDate
            drivingLicenseNumber
            drivingLicenseType
            job
            hiringDate
            comment
            driverKey
            email
            mobile
            lastModificationDate
            code
            address
            agencyId
            cdc
            pdm
            nni
            companyDriversId
            createdAt
            updatedAt
            __typename
          }
          nextToken
          __typename
        }
        trames {
          items {
            id
            speed
            lat
            lng
            address
            azimut
            immobilisation
            timestamp
            state
            fuel
            ibuttonCode
            companyId
            driverFullName
            vehicleBrandName
            companyTramesId
            processor
            createdAt
            updatedAt
            trameDriverSub
            trameVehicleImmat
            __typename
          }
          nextToken
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser($filter: ModelSubscriptionUserFilterInput) {
    onDeleteUser(filter: $filter) {
      sub
      firstname
      lastname
      mobile
      beginDate
      endDate
      mappingId
      languageCode
      lastModificationDate
      showReport
      dispatcher
      applicationVersion
      themeId
      picture {
        bucket
        region
        key
        __typename
      }
      companyUsersId
      company {
        id
        name
        siret
        address
        postalCode
        city
        countryCode
        contact
        email
        mobile
        phone
        fax
        creationDate
        subscriptionDate
        keyedStart
        users {
          items {
            sub
            firstname
            lastname
            mobile
            beginDate
            endDate
            mappingId
            languageCode
            lastModificationDate
            showReport
            dispatcher
            applicationVersion
            themeId
            companyUsersId
            createdAt
            updatedAt
            __typename
          }
          nextToken
          __typename
        }
        vehicles {
          items {
            immat
            year
            fuelType
            consumption
            maxSpeed
            seatCount
            icon
            kilometerage
            kilometerPrice
            kilometerageStart
            kilometerageDay
            kilometerageLastUpdate
            timeRunning
            counterValue
            co2
            lastModificationDate
            rollingTimeStart
            rollingTimeDay
            locations
            installationPrecautions
            code
            gefcoSend
            tankCapacity
            canMileage
            companyVehiclesId
            createdAt
            updatedAt
            vehicleVehicleCategoryId
            vehicleBrandBrandName
            vehicleModeleId
            vehicleDeviceImei
            __typename
          }
          nextToken
          __typename
        }
        drivers {
          items {
            sub
            firstname
            lastname
            fullname
            birthDate
            drivingLicenseNumber
            drivingLicenseType
            job
            hiringDate
            comment
            driverKey
            email
            mobile
            lastModificationDate
            code
            address
            agencyId
            cdc
            pdm
            nni
            companyDriversId
            createdAt
            updatedAt
            __typename
          }
          nextToken
          __typename
        }
        trames {
          items {
            id
            speed
            lat
            lng
            address
            azimut
            immobilisation
            timestamp
            state
            fuel
            ibuttonCode
            companyId
            driverFullName
            vehicleBrandName
            companyTramesId
            processor
            createdAt
            updatedAt
            trameDriverSub
            trameVehicleImmat
            __typename
          }
          nextToken
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateDriver = /* GraphQL */ `
  subscription OnCreateDriver($filter: ModelSubscriptionDriverFilterInput) {
    onCreateDriver(filter: $filter) {
      sub
      firstname
      lastname
      fullname
      birthDate
      drivingLicenseNumber
      drivingLicenseType
      job
      hiringDate
      comment
      driverKey
      email
      mobile
      lastModificationDate
      code
      address
      agencyId
      cdc
      pdm
      nni
      companyDriversId
      company {
        id
        name
        siret
        address
        postalCode
        city
        countryCode
        contact
        email
        mobile
        phone
        fax
        creationDate
        subscriptionDate
        keyedStart
        users {
          items {
            sub
            firstname
            lastname
            mobile
            beginDate
            endDate
            mappingId
            languageCode
            lastModificationDate
            showReport
            dispatcher
            applicationVersion
            themeId
            companyUsersId
            createdAt
            updatedAt
            __typename
          }
          nextToken
          __typename
        }
        vehicles {
          items {
            immat
            year
            fuelType
            consumption
            maxSpeed
            seatCount
            icon
            kilometerage
            kilometerPrice
            kilometerageStart
            kilometerageDay
            kilometerageLastUpdate
            timeRunning
            counterValue
            co2
            lastModificationDate
            rollingTimeStart
            rollingTimeDay
            locations
            installationPrecautions
            code
            gefcoSend
            tankCapacity
            canMileage
            companyVehiclesId
            createdAt
            updatedAt
            vehicleVehicleCategoryId
            vehicleBrandBrandName
            vehicleModeleId
            vehicleDeviceImei
            __typename
          }
          nextToken
          __typename
        }
        drivers {
          items {
            sub
            firstname
            lastname
            fullname
            birthDate
            drivingLicenseNumber
            drivingLicenseType
            job
            hiringDate
            comment
            driverKey
            email
            mobile
            lastModificationDate
            code
            address
            agencyId
            cdc
            pdm
            nni
            companyDriversId
            createdAt
            updatedAt
            __typename
          }
          nextToken
          __typename
        }
        trames {
          items {
            id
            speed
            lat
            lng
            address
            azimut
            immobilisation
            timestamp
            state
            fuel
            ibuttonCode
            companyId
            driverFullName
            vehicleBrandName
            companyTramesId
            processor
            createdAt
            updatedAt
            trameDriverSub
            trameVehicleImmat
            __typename
          }
          nextToken
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateDriver = /* GraphQL */ `
  subscription OnUpdateDriver($filter: ModelSubscriptionDriverFilterInput) {
    onUpdateDriver(filter: $filter) {
      sub
      firstname
      lastname
      fullname
      birthDate
      drivingLicenseNumber
      drivingLicenseType
      job
      hiringDate
      comment
      driverKey
      email
      mobile
      lastModificationDate
      code
      address
      agencyId
      cdc
      pdm
      nni
      companyDriversId
      company {
        id
        name
        siret
        address
        postalCode
        city
        countryCode
        contact
        email
        mobile
        phone
        fax
        creationDate
        subscriptionDate
        keyedStart
        users {
          items {
            sub
            firstname
            lastname
            mobile
            beginDate
            endDate
            mappingId
            languageCode
            lastModificationDate
            showReport
            dispatcher
            applicationVersion
            themeId
            companyUsersId
            createdAt
            updatedAt
            __typename
          }
          nextToken
          __typename
        }
        vehicles {
          items {
            immat
            year
            fuelType
            consumption
            maxSpeed
            seatCount
            icon
            kilometerage
            kilometerPrice
            kilometerageStart
            kilometerageDay
            kilometerageLastUpdate
            timeRunning
            counterValue
            co2
            lastModificationDate
            rollingTimeStart
            rollingTimeDay
            locations
            installationPrecautions
            code
            gefcoSend
            tankCapacity
            canMileage
            companyVehiclesId
            createdAt
            updatedAt
            vehicleVehicleCategoryId
            vehicleBrandBrandName
            vehicleModeleId
            vehicleDeviceImei
            __typename
          }
          nextToken
          __typename
        }
        drivers {
          items {
            sub
            firstname
            lastname
            fullname
            birthDate
            drivingLicenseNumber
            drivingLicenseType
            job
            hiringDate
            comment
            driverKey
            email
            mobile
            lastModificationDate
            code
            address
            agencyId
            cdc
            pdm
            nni
            companyDriversId
            createdAt
            updatedAt
            __typename
          }
          nextToken
          __typename
        }
        trames {
          items {
            id
            speed
            lat
            lng
            address
            azimut
            immobilisation
            timestamp
            state
            fuel
            ibuttonCode
            companyId
            driverFullName
            vehicleBrandName
            companyTramesId
            processor
            createdAt
            updatedAt
            trameDriverSub
            trameVehicleImmat
            __typename
          }
          nextToken
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteDriver = /* GraphQL */ `
  subscription OnDeleteDriver($filter: ModelSubscriptionDriverFilterInput) {
    onDeleteDriver(filter: $filter) {
      sub
      firstname
      lastname
      fullname
      birthDate
      drivingLicenseNumber
      drivingLicenseType
      job
      hiringDate
      comment
      driverKey
      email
      mobile
      lastModificationDate
      code
      address
      agencyId
      cdc
      pdm
      nni
      companyDriversId
      company {
        id
        name
        siret
        address
        postalCode
        city
        countryCode
        contact
        email
        mobile
        phone
        fax
        creationDate
        subscriptionDate
        keyedStart
        users {
          items {
            sub
            firstname
            lastname
            mobile
            beginDate
            endDate
            mappingId
            languageCode
            lastModificationDate
            showReport
            dispatcher
            applicationVersion
            themeId
            companyUsersId
            createdAt
            updatedAt
            __typename
          }
          nextToken
          __typename
        }
        vehicles {
          items {
            immat
            year
            fuelType
            consumption
            maxSpeed
            seatCount
            icon
            kilometerage
            kilometerPrice
            kilometerageStart
            kilometerageDay
            kilometerageLastUpdate
            timeRunning
            counterValue
            co2
            lastModificationDate
            rollingTimeStart
            rollingTimeDay
            locations
            installationPrecautions
            code
            gefcoSend
            tankCapacity
            canMileage
            companyVehiclesId
            createdAt
            updatedAt
            vehicleVehicleCategoryId
            vehicleBrandBrandName
            vehicleModeleId
            vehicleDeviceImei
            __typename
          }
          nextToken
          __typename
        }
        drivers {
          items {
            sub
            firstname
            lastname
            fullname
            birthDate
            drivingLicenseNumber
            drivingLicenseType
            job
            hiringDate
            comment
            driverKey
            email
            mobile
            lastModificationDate
            code
            address
            agencyId
            cdc
            pdm
            nni
            companyDriversId
            createdAt
            updatedAt
            __typename
          }
          nextToken
          __typename
        }
        trames {
          items {
            id
            speed
            lat
            lng
            address
            azimut
            immobilisation
            timestamp
            state
            fuel
            ibuttonCode
            companyId
            driverFullName
            vehicleBrandName
            companyTramesId
            processor
            createdAt
            updatedAt
            trameDriverSub
            trameVehicleImmat
            __typename
          }
          nextToken
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateVehicle = /* GraphQL */ `
  subscription OnCreateVehicle($filter: ModelSubscriptionVehicleFilterInput) {
    onCreateVehicle(filter: $filter) {
      immat
      year
      fuelType
      consumption
      maxSpeed
      seatCount
      icon
      picture {
        bucket
        region
        key
        __typename
      }
      kilometerage
      kilometerPrice
      kilometerageStart
      kilometerageDay
      kilometerageLastUpdate
      timeRunning
      counterValue
      co2
      lastModificationDate
      rollingTimeStart
      rollingTimeDay
      locations
      installationPrecautions
      code
      vehicleCategory {
        id
        category
        description
        createdAt
        updatedAt
        __typename
      }
      brand {
        brandName
        logo {
          bucket
          region
          key
          __typename
        }
        models {
          items {
            id
            modele
            createdAt
            updatedAt
            vehicleBrandModelsBrandName
            __typename
          }
          nextToken
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      modele {
        id
        modele
        brand {
          brandName
          logo {
            bucket
            region
            key
            __typename
          }
          models {
            nextToken
            __typename
          }
          createdAt
          updatedAt
          __typename
        }
        createdAt
        updatedAt
        vehicleBrandModelsBrandName
        __typename
      }
      gefcoSend
      tankCapacity
      canMileage
      companyVehiclesId
      company {
        id
        name
        siret
        address
        postalCode
        city
        countryCode
        contact
        email
        mobile
        phone
        fax
        creationDate
        subscriptionDate
        keyedStart
        users {
          items {
            sub
            firstname
            lastname
            mobile
            beginDate
            endDate
            mappingId
            languageCode
            lastModificationDate
            showReport
            dispatcher
            applicationVersion
            themeId
            companyUsersId
            createdAt
            updatedAt
            __typename
          }
          nextToken
          __typename
        }
        vehicles {
          items {
            immat
            year
            fuelType
            consumption
            maxSpeed
            seatCount
            icon
            kilometerage
            kilometerPrice
            kilometerageStart
            kilometerageDay
            kilometerageLastUpdate
            timeRunning
            counterValue
            co2
            lastModificationDate
            rollingTimeStart
            rollingTimeDay
            locations
            installationPrecautions
            code
            gefcoSend
            tankCapacity
            canMileage
            companyVehiclesId
            createdAt
            updatedAt
            vehicleVehicleCategoryId
            vehicleBrandBrandName
            vehicleModeleId
            vehicleDeviceImei
            __typename
          }
          nextToken
          __typename
        }
        drivers {
          items {
            sub
            firstname
            lastname
            fullname
            birthDate
            drivingLicenseNumber
            drivingLicenseType
            job
            hiringDate
            comment
            driverKey
            email
            mobile
            lastModificationDate
            code
            address
            agencyId
            cdc
            pdm
            nni
            companyDriversId
            createdAt
            updatedAt
            __typename
          }
          nextToken
          __typename
        }
        trames {
          items {
            id
            speed
            lat
            lng
            address
            azimut
            immobilisation
            timestamp
            state
            fuel
            ibuttonCode
            companyId
            driverFullName
            vehicleBrandName
            companyTramesId
            processor
            createdAt
            updatedAt
            trameDriverSub
            trameVehicleImmat
            __typename
          }
          nextToken
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      device {
        imei
        protocolId
        sim
        vehicle {
          immat
          year
          fuelType
          consumption
          maxSpeed
          seatCount
          icon
          picture {
            bucket
            region
            key
            __typename
          }
          kilometerage
          kilometerPrice
          kilometerageStart
          kilometerageDay
          kilometerageLastUpdate
          timeRunning
          counterValue
          co2
          lastModificationDate
          rollingTimeStart
          rollingTimeDay
          locations
          installationPrecautions
          code
          vehicleCategory {
            id
            category
            description
            createdAt
            updatedAt
            __typename
          }
          brand {
            brandName
            createdAt
            updatedAt
            __typename
          }
          modele {
            id
            modele
            createdAt
            updatedAt
            vehicleBrandModelsBrandName
            __typename
          }
          gefcoSend
          tankCapacity
          canMileage
          companyVehiclesId
          company {
            id
            name
            siret
            address
            postalCode
            city
            countryCode
            contact
            email
            mobile
            phone
            fax
            creationDate
            subscriptionDate
            keyedStart
            createdAt
            updatedAt
            __typename
          }
          device {
            imei
            protocolId
            sim
            createdAt
            updatedAt
            deviceVehicleImmat
            __typename
          }
          alerts {
            nextToken
            __typename
          }
          tags {
            nextToken
            __typename
          }
          createdAt
          updatedAt
          vehicleVehicleCategoryId
          vehicleBrandBrandName
          vehicleModeleId
          vehicleDeviceImei
          __typename
        }
        createdAt
        updatedAt
        deviceVehicleImmat
        __typename
      }
      alerts {
        items {
          id
          vehicleImmat
          vehicle {
            immat
            year
            fuelType
            consumption
            maxSpeed
            seatCount
            icon
            kilometerage
            kilometerPrice
            kilometerageStart
            kilometerageDay
            kilometerageLastUpdate
            timeRunning
            counterValue
            co2
            lastModificationDate
            rollingTimeStart
            rollingTimeDay
            locations
            installationPrecautions
            code
            gefcoSend
            tankCapacity
            canMileage
            companyVehiclesId
            createdAt
            updatedAt
            vehicleVehicleCategoryId
            vehicleBrandBrandName
            vehicleModeleId
            vehicleDeviceImei
            __typename
          }
          alertId
          alert {
            id
            name
            type
            disabled
            instantaneous
            reportFrequency
            byMail
            bySms
            byWhatsapp
            smsTemplate
            emailTemplate
            sentToDriver
            phones
            emails
            extra
            createdAt
            updatedAt
            alertCompanyId
            alertZoneId
            __typename
          }
          isFlespi
          createdAt
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      tags {
        items {
          id
          vehicleImmat
          tagId
          vehicle {
            immat
            year
            fuelType
            consumption
            maxSpeed
            seatCount
            icon
            kilometerage
            kilometerPrice
            kilometerageStart
            kilometerageDay
            kilometerageLastUpdate
            timeRunning
            counterValue
            co2
            lastModificationDate
            rollingTimeStart
            rollingTimeDay
            locations
            installationPrecautions
            code
            gefcoSend
            tankCapacity
            canMileage
            companyVehiclesId
            createdAt
            updatedAt
            vehicleVehicleCategoryId
            vehicleBrandBrandName
            vehicleModeleId
            vehicleDeviceImei
            __typename
          }
          tag {
            id
            name
            description
            color
            createdAt
            updatedAt
            __typename
          }
          createdAt
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      createdAt
      updatedAt
      vehicleVehicleCategoryId
      vehicleBrandBrandName
      vehicleModeleId
      vehicleDeviceImei
      __typename
    }
  }
`;
export const onUpdateVehicle = /* GraphQL */ `
  subscription OnUpdateVehicle($filter: ModelSubscriptionVehicleFilterInput) {
    onUpdateVehicle(filter: $filter) {
      immat
      year
      fuelType
      consumption
      maxSpeed
      seatCount
      icon
      picture {
        bucket
        region
        key
        __typename
      }
      kilometerage
      kilometerPrice
      kilometerageStart
      kilometerageDay
      kilometerageLastUpdate
      timeRunning
      counterValue
      co2
      lastModificationDate
      rollingTimeStart
      rollingTimeDay
      locations
      installationPrecautions
      code
      vehicleCategory {
        id
        category
        description
        createdAt
        updatedAt
        __typename
      }
      brand {
        brandName
        logo {
          bucket
          region
          key
          __typename
        }
        models {
          items {
            id
            modele
            createdAt
            updatedAt
            vehicleBrandModelsBrandName
            __typename
          }
          nextToken
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      modele {
        id
        modele
        brand {
          brandName
          logo {
            bucket
            region
            key
            __typename
          }
          models {
            nextToken
            __typename
          }
          createdAt
          updatedAt
          __typename
        }
        createdAt
        updatedAt
        vehicleBrandModelsBrandName
        __typename
      }
      gefcoSend
      tankCapacity
      canMileage
      companyVehiclesId
      company {
        id
        name
        siret
        address
        postalCode
        city
        countryCode
        contact
        email
        mobile
        phone
        fax
        creationDate
        subscriptionDate
        keyedStart
        users {
          items {
            sub
            firstname
            lastname
            mobile
            beginDate
            endDate
            mappingId
            languageCode
            lastModificationDate
            showReport
            dispatcher
            applicationVersion
            themeId
            companyUsersId
            createdAt
            updatedAt
            __typename
          }
          nextToken
          __typename
        }
        vehicles {
          items {
            immat
            year
            fuelType
            consumption
            maxSpeed
            seatCount
            icon
            kilometerage
            kilometerPrice
            kilometerageStart
            kilometerageDay
            kilometerageLastUpdate
            timeRunning
            counterValue
            co2
            lastModificationDate
            rollingTimeStart
            rollingTimeDay
            locations
            installationPrecautions
            code
            gefcoSend
            tankCapacity
            canMileage
            companyVehiclesId
            createdAt
            updatedAt
            vehicleVehicleCategoryId
            vehicleBrandBrandName
            vehicleModeleId
            vehicleDeviceImei
            __typename
          }
          nextToken
          __typename
        }
        drivers {
          items {
            sub
            firstname
            lastname
            fullname
            birthDate
            drivingLicenseNumber
            drivingLicenseType
            job
            hiringDate
            comment
            driverKey
            email
            mobile
            lastModificationDate
            code
            address
            agencyId
            cdc
            pdm
            nni
            companyDriversId
            createdAt
            updatedAt
            __typename
          }
          nextToken
          __typename
        }
        trames {
          items {
            id
            speed
            lat
            lng
            address
            azimut
            immobilisation
            timestamp
            state
            fuel
            ibuttonCode
            companyId
            driverFullName
            vehicleBrandName
            companyTramesId
            processor
            createdAt
            updatedAt
            trameDriverSub
            trameVehicleImmat
            __typename
          }
          nextToken
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      device {
        imei
        protocolId
        sim
        vehicle {
          immat
          year
          fuelType
          consumption
          maxSpeed
          seatCount
          icon
          picture {
            bucket
            region
            key
            __typename
          }
          kilometerage
          kilometerPrice
          kilometerageStart
          kilometerageDay
          kilometerageLastUpdate
          timeRunning
          counterValue
          co2
          lastModificationDate
          rollingTimeStart
          rollingTimeDay
          locations
          installationPrecautions
          code
          vehicleCategory {
            id
            category
            description
            createdAt
            updatedAt
            __typename
          }
          brand {
            brandName
            createdAt
            updatedAt
            __typename
          }
          modele {
            id
            modele
            createdAt
            updatedAt
            vehicleBrandModelsBrandName
            __typename
          }
          gefcoSend
          tankCapacity
          canMileage
          companyVehiclesId
          company {
            id
            name
            siret
            address
            postalCode
            city
            countryCode
            contact
            email
            mobile
            phone
            fax
            creationDate
            subscriptionDate
            keyedStart
            createdAt
            updatedAt
            __typename
          }
          device {
            imei
            protocolId
            sim
            createdAt
            updatedAt
            deviceVehicleImmat
            __typename
          }
          alerts {
            nextToken
            __typename
          }
          tags {
            nextToken
            __typename
          }
          createdAt
          updatedAt
          vehicleVehicleCategoryId
          vehicleBrandBrandName
          vehicleModeleId
          vehicleDeviceImei
          __typename
        }
        createdAt
        updatedAt
        deviceVehicleImmat
        __typename
      }
      alerts {
        items {
          id
          vehicleImmat
          vehicle {
            immat
            year
            fuelType
            consumption
            maxSpeed
            seatCount
            icon
            kilometerage
            kilometerPrice
            kilometerageStart
            kilometerageDay
            kilometerageLastUpdate
            timeRunning
            counterValue
            co2
            lastModificationDate
            rollingTimeStart
            rollingTimeDay
            locations
            installationPrecautions
            code
            gefcoSend
            tankCapacity
            canMileage
            companyVehiclesId
            createdAt
            updatedAt
            vehicleVehicleCategoryId
            vehicleBrandBrandName
            vehicleModeleId
            vehicleDeviceImei
            __typename
          }
          alertId
          alert {
            id
            name
            type
            disabled
            instantaneous
            reportFrequency
            byMail
            bySms
            byWhatsapp
            smsTemplate
            emailTemplate
            sentToDriver
            phones
            emails
            extra
            createdAt
            updatedAt
            alertCompanyId
            alertZoneId
            __typename
          }
          isFlespi
          createdAt
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      tags {
        items {
          id
          vehicleImmat
          tagId
          vehicle {
            immat
            year
            fuelType
            consumption
            maxSpeed
            seatCount
            icon
            kilometerage
            kilometerPrice
            kilometerageStart
            kilometerageDay
            kilometerageLastUpdate
            timeRunning
            counterValue
            co2
            lastModificationDate
            rollingTimeStart
            rollingTimeDay
            locations
            installationPrecautions
            code
            gefcoSend
            tankCapacity
            canMileage
            companyVehiclesId
            createdAt
            updatedAt
            vehicleVehicleCategoryId
            vehicleBrandBrandName
            vehicleModeleId
            vehicleDeviceImei
            __typename
          }
          tag {
            id
            name
            description
            color
            createdAt
            updatedAt
            __typename
          }
          createdAt
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      createdAt
      updatedAt
      vehicleVehicleCategoryId
      vehicleBrandBrandName
      vehicleModeleId
      vehicleDeviceImei
      __typename
    }
  }
`;
export const onDeleteVehicle = /* GraphQL */ `
  subscription OnDeleteVehicle($filter: ModelSubscriptionVehicleFilterInput) {
    onDeleteVehicle(filter: $filter) {
      immat
      year
      fuelType
      consumption
      maxSpeed
      seatCount
      icon
      picture {
        bucket
        region
        key
        __typename
      }
      kilometerage
      kilometerPrice
      kilometerageStart
      kilometerageDay
      kilometerageLastUpdate
      timeRunning
      counterValue
      co2
      lastModificationDate
      rollingTimeStart
      rollingTimeDay
      locations
      installationPrecautions
      code
      vehicleCategory {
        id
        category
        description
        createdAt
        updatedAt
        __typename
      }
      brand {
        brandName
        logo {
          bucket
          region
          key
          __typename
        }
        models {
          items {
            id
            modele
            createdAt
            updatedAt
            vehicleBrandModelsBrandName
            __typename
          }
          nextToken
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      modele {
        id
        modele
        brand {
          brandName
          logo {
            bucket
            region
            key
            __typename
          }
          models {
            nextToken
            __typename
          }
          createdAt
          updatedAt
          __typename
        }
        createdAt
        updatedAt
        vehicleBrandModelsBrandName
        __typename
      }
      gefcoSend
      tankCapacity
      canMileage
      companyVehiclesId
      company {
        id
        name
        siret
        address
        postalCode
        city
        countryCode
        contact
        email
        mobile
        phone
        fax
        creationDate
        subscriptionDate
        keyedStart
        users {
          items {
            sub
            firstname
            lastname
            mobile
            beginDate
            endDate
            mappingId
            languageCode
            lastModificationDate
            showReport
            dispatcher
            applicationVersion
            themeId
            companyUsersId
            createdAt
            updatedAt
            __typename
          }
          nextToken
          __typename
        }
        vehicles {
          items {
            immat
            year
            fuelType
            consumption
            maxSpeed
            seatCount
            icon
            kilometerage
            kilometerPrice
            kilometerageStart
            kilometerageDay
            kilometerageLastUpdate
            timeRunning
            counterValue
            co2
            lastModificationDate
            rollingTimeStart
            rollingTimeDay
            locations
            installationPrecautions
            code
            gefcoSend
            tankCapacity
            canMileage
            companyVehiclesId
            createdAt
            updatedAt
            vehicleVehicleCategoryId
            vehicleBrandBrandName
            vehicleModeleId
            vehicleDeviceImei
            __typename
          }
          nextToken
          __typename
        }
        drivers {
          items {
            sub
            firstname
            lastname
            fullname
            birthDate
            drivingLicenseNumber
            drivingLicenseType
            job
            hiringDate
            comment
            driverKey
            email
            mobile
            lastModificationDate
            code
            address
            agencyId
            cdc
            pdm
            nni
            companyDriversId
            createdAt
            updatedAt
            __typename
          }
          nextToken
          __typename
        }
        trames {
          items {
            id
            speed
            lat
            lng
            address
            azimut
            immobilisation
            timestamp
            state
            fuel
            ibuttonCode
            companyId
            driverFullName
            vehicleBrandName
            companyTramesId
            processor
            createdAt
            updatedAt
            trameDriverSub
            trameVehicleImmat
            __typename
          }
          nextToken
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      device {
        imei
        protocolId
        sim
        vehicle {
          immat
          year
          fuelType
          consumption
          maxSpeed
          seatCount
          icon
          picture {
            bucket
            region
            key
            __typename
          }
          kilometerage
          kilometerPrice
          kilometerageStart
          kilometerageDay
          kilometerageLastUpdate
          timeRunning
          counterValue
          co2
          lastModificationDate
          rollingTimeStart
          rollingTimeDay
          locations
          installationPrecautions
          code
          vehicleCategory {
            id
            category
            description
            createdAt
            updatedAt
            __typename
          }
          brand {
            brandName
            createdAt
            updatedAt
            __typename
          }
          modele {
            id
            modele
            createdAt
            updatedAt
            vehicleBrandModelsBrandName
            __typename
          }
          gefcoSend
          tankCapacity
          canMileage
          companyVehiclesId
          company {
            id
            name
            siret
            address
            postalCode
            city
            countryCode
            contact
            email
            mobile
            phone
            fax
            creationDate
            subscriptionDate
            keyedStart
            createdAt
            updatedAt
            __typename
          }
          device {
            imei
            protocolId
            sim
            createdAt
            updatedAt
            deviceVehicleImmat
            __typename
          }
          alerts {
            nextToken
            __typename
          }
          tags {
            nextToken
            __typename
          }
          createdAt
          updatedAt
          vehicleVehicleCategoryId
          vehicleBrandBrandName
          vehicleModeleId
          vehicleDeviceImei
          __typename
        }
        createdAt
        updatedAt
        deviceVehicleImmat
        __typename
      }
      alerts {
        items {
          id
          vehicleImmat
          vehicle {
            immat
            year
            fuelType
            consumption
            maxSpeed
            seatCount
            icon
            kilometerage
            kilometerPrice
            kilometerageStart
            kilometerageDay
            kilometerageLastUpdate
            timeRunning
            counterValue
            co2
            lastModificationDate
            rollingTimeStart
            rollingTimeDay
            locations
            installationPrecautions
            code
            gefcoSend
            tankCapacity
            canMileage
            companyVehiclesId
            createdAt
            updatedAt
            vehicleVehicleCategoryId
            vehicleBrandBrandName
            vehicleModeleId
            vehicleDeviceImei
            __typename
          }
          alertId
          alert {
            id
            name
            type
            disabled
            instantaneous
            reportFrequency
            byMail
            bySms
            byWhatsapp
            smsTemplate
            emailTemplate
            sentToDriver
            phones
            emails
            extra
            createdAt
            updatedAt
            alertCompanyId
            alertZoneId
            __typename
          }
          isFlespi
          createdAt
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      tags {
        items {
          id
          vehicleImmat
          tagId
          vehicle {
            immat
            year
            fuelType
            consumption
            maxSpeed
            seatCount
            icon
            kilometerage
            kilometerPrice
            kilometerageStart
            kilometerageDay
            kilometerageLastUpdate
            timeRunning
            counterValue
            co2
            lastModificationDate
            rollingTimeStart
            rollingTimeDay
            locations
            installationPrecautions
            code
            gefcoSend
            tankCapacity
            canMileage
            companyVehiclesId
            createdAt
            updatedAt
            vehicleVehicleCategoryId
            vehicleBrandBrandName
            vehicleModeleId
            vehicleDeviceImei
            __typename
          }
          tag {
            id
            name
            description
            color
            createdAt
            updatedAt
            __typename
          }
          createdAt
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      createdAt
      updatedAt
      vehicleVehicleCategoryId
      vehicleBrandBrandName
      vehicleModeleId
      vehicleDeviceImei
      __typename
    }
  }
`;
export const onCreateAlert = /* GraphQL */ `
  subscription OnCreateAlert($filter: ModelSubscriptionAlertFilterInput) {
    onCreateAlert(filter: $filter) {
      id
      name
      type
      disabled
      instantaneous
      reportFrequency
      byMail
      bySms
      byWhatsapp
      smsTemplate
      emailTemplate
      sentToDriver
      phones
      emails
      company {
        id
        name
        siret
        address
        postalCode
        city
        countryCode
        contact
        email
        mobile
        phone
        fax
        creationDate
        subscriptionDate
        keyedStart
        users {
          items {
            sub
            firstname
            lastname
            mobile
            beginDate
            endDate
            mappingId
            languageCode
            lastModificationDate
            showReport
            dispatcher
            applicationVersion
            themeId
            companyUsersId
            createdAt
            updatedAt
            __typename
          }
          nextToken
          __typename
        }
        vehicles {
          items {
            immat
            year
            fuelType
            consumption
            maxSpeed
            seatCount
            icon
            kilometerage
            kilometerPrice
            kilometerageStart
            kilometerageDay
            kilometerageLastUpdate
            timeRunning
            counterValue
            co2
            lastModificationDate
            rollingTimeStart
            rollingTimeDay
            locations
            installationPrecautions
            code
            gefcoSend
            tankCapacity
            canMileage
            companyVehiclesId
            createdAt
            updatedAt
            vehicleVehicleCategoryId
            vehicleBrandBrandName
            vehicleModeleId
            vehicleDeviceImei
            __typename
          }
          nextToken
          __typename
        }
        drivers {
          items {
            sub
            firstname
            lastname
            fullname
            birthDate
            drivingLicenseNumber
            drivingLicenseType
            job
            hiringDate
            comment
            driverKey
            email
            mobile
            lastModificationDate
            code
            address
            agencyId
            cdc
            pdm
            nni
            companyDriversId
            createdAt
            updatedAt
            __typename
          }
          nextToken
          __typename
        }
        trames {
          items {
            id
            speed
            lat
            lng
            address
            azimut
            immobilisation
            timestamp
            state
            fuel
            ibuttonCode
            companyId
            driverFullName
            vehicleBrandName
            companyTramesId
            processor
            createdAt
            updatedAt
            trameDriverSub
            trameVehicleImmat
            __typename
          }
          nextToken
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      vehicles {
        items {
          id
          vehicleImmat
          vehicle {
            immat
            year
            fuelType
            consumption
            maxSpeed
            seatCount
            icon
            kilometerage
            kilometerPrice
            kilometerageStart
            kilometerageDay
            kilometerageLastUpdate
            timeRunning
            counterValue
            co2
            lastModificationDate
            rollingTimeStart
            rollingTimeDay
            locations
            installationPrecautions
            code
            gefcoSend
            tankCapacity
            canMileage
            companyVehiclesId
            createdAt
            updatedAt
            vehicleVehicleCategoryId
            vehicleBrandBrandName
            vehicleModeleId
            vehicleDeviceImei
            __typename
          }
          alertId
          alert {
            id
            name
            type
            disabled
            instantaneous
            reportFrequency
            byMail
            bySms
            byWhatsapp
            smsTemplate
            emailTemplate
            sentToDriver
            phones
            emails
            extra
            createdAt
            updatedAt
            alertCompanyId
            alertZoneId
            __typename
          }
          isFlespi
          createdAt
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      extra
      zone {
        id
        name
        lat
        lng
        radius
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      alertCompanyId
      alertZoneId
      __typename
    }
  }
`;
export const onUpdateAlert = /* GraphQL */ `
  subscription OnUpdateAlert($filter: ModelSubscriptionAlertFilterInput) {
    onUpdateAlert(filter: $filter) {
      id
      name
      type
      disabled
      instantaneous
      reportFrequency
      byMail
      bySms
      byWhatsapp
      smsTemplate
      emailTemplate
      sentToDriver
      phones
      emails
      company {
        id
        name
        siret
        address
        postalCode
        city
        countryCode
        contact
        email
        mobile
        phone
        fax
        creationDate
        subscriptionDate
        keyedStart
        users {
          items {
            sub
            firstname
            lastname
            mobile
            beginDate
            endDate
            mappingId
            languageCode
            lastModificationDate
            showReport
            dispatcher
            applicationVersion
            themeId
            companyUsersId
            createdAt
            updatedAt
            __typename
          }
          nextToken
          __typename
        }
        vehicles {
          items {
            immat
            year
            fuelType
            consumption
            maxSpeed
            seatCount
            icon
            kilometerage
            kilometerPrice
            kilometerageStart
            kilometerageDay
            kilometerageLastUpdate
            timeRunning
            counterValue
            co2
            lastModificationDate
            rollingTimeStart
            rollingTimeDay
            locations
            installationPrecautions
            code
            gefcoSend
            tankCapacity
            canMileage
            companyVehiclesId
            createdAt
            updatedAt
            vehicleVehicleCategoryId
            vehicleBrandBrandName
            vehicleModeleId
            vehicleDeviceImei
            __typename
          }
          nextToken
          __typename
        }
        drivers {
          items {
            sub
            firstname
            lastname
            fullname
            birthDate
            drivingLicenseNumber
            drivingLicenseType
            job
            hiringDate
            comment
            driverKey
            email
            mobile
            lastModificationDate
            code
            address
            agencyId
            cdc
            pdm
            nni
            companyDriversId
            createdAt
            updatedAt
            __typename
          }
          nextToken
          __typename
        }
        trames {
          items {
            id
            speed
            lat
            lng
            address
            azimut
            immobilisation
            timestamp
            state
            fuel
            ibuttonCode
            companyId
            driverFullName
            vehicleBrandName
            companyTramesId
            processor
            createdAt
            updatedAt
            trameDriverSub
            trameVehicleImmat
            __typename
          }
          nextToken
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      vehicles {
        items {
          id
          vehicleImmat
          vehicle {
            immat
            year
            fuelType
            consumption
            maxSpeed
            seatCount
            icon
            kilometerage
            kilometerPrice
            kilometerageStart
            kilometerageDay
            kilometerageLastUpdate
            timeRunning
            counterValue
            co2
            lastModificationDate
            rollingTimeStart
            rollingTimeDay
            locations
            installationPrecautions
            code
            gefcoSend
            tankCapacity
            canMileage
            companyVehiclesId
            createdAt
            updatedAt
            vehicleVehicleCategoryId
            vehicleBrandBrandName
            vehicleModeleId
            vehicleDeviceImei
            __typename
          }
          alertId
          alert {
            id
            name
            type
            disabled
            instantaneous
            reportFrequency
            byMail
            bySms
            byWhatsapp
            smsTemplate
            emailTemplate
            sentToDriver
            phones
            emails
            extra
            createdAt
            updatedAt
            alertCompanyId
            alertZoneId
            __typename
          }
          isFlespi
          createdAt
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      extra
      zone {
        id
        name
        lat
        lng
        radius
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      alertCompanyId
      alertZoneId
      __typename
    }
  }
`;
export const onDeleteAlert = /* GraphQL */ `
  subscription OnDeleteAlert($filter: ModelSubscriptionAlertFilterInput) {
    onDeleteAlert(filter: $filter) {
      id
      name
      type
      disabled
      instantaneous
      reportFrequency
      byMail
      bySms
      byWhatsapp
      smsTemplate
      emailTemplate
      sentToDriver
      phones
      emails
      company {
        id
        name
        siret
        address
        postalCode
        city
        countryCode
        contact
        email
        mobile
        phone
        fax
        creationDate
        subscriptionDate
        keyedStart
        users {
          items {
            sub
            firstname
            lastname
            mobile
            beginDate
            endDate
            mappingId
            languageCode
            lastModificationDate
            showReport
            dispatcher
            applicationVersion
            themeId
            companyUsersId
            createdAt
            updatedAt
            __typename
          }
          nextToken
          __typename
        }
        vehicles {
          items {
            immat
            year
            fuelType
            consumption
            maxSpeed
            seatCount
            icon
            kilometerage
            kilometerPrice
            kilometerageStart
            kilometerageDay
            kilometerageLastUpdate
            timeRunning
            counterValue
            co2
            lastModificationDate
            rollingTimeStart
            rollingTimeDay
            locations
            installationPrecautions
            code
            gefcoSend
            tankCapacity
            canMileage
            companyVehiclesId
            createdAt
            updatedAt
            vehicleVehicleCategoryId
            vehicleBrandBrandName
            vehicleModeleId
            vehicleDeviceImei
            __typename
          }
          nextToken
          __typename
        }
        drivers {
          items {
            sub
            firstname
            lastname
            fullname
            birthDate
            drivingLicenseNumber
            drivingLicenseType
            job
            hiringDate
            comment
            driverKey
            email
            mobile
            lastModificationDate
            code
            address
            agencyId
            cdc
            pdm
            nni
            companyDriversId
            createdAt
            updatedAt
            __typename
          }
          nextToken
          __typename
        }
        trames {
          items {
            id
            speed
            lat
            lng
            address
            azimut
            immobilisation
            timestamp
            state
            fuel
            ibuttonCode
            companyId
            driverFullName
            vehicleBrandName
            companyTramesId
            processor
            createdAt
            updatedAt
            trameDriverSub
            trameVehicleImmat
            __typename
          }
          nextToken
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      vehicles {
        items {
          id
          vehicleImmat
          vehicle {
            immat
            year
            fuelType
            consumption
            maxSpeed
            seatCount
            icon
            kilometerage
            kilometerPrice
            kilometerageStart
            kilometerageDay
            kilometerageLastUpdate
            timeRunning
            counterValue
            co2
            lastModificationDate
            rollingTimeStart
            rollingTimeDay
            locations
            installationPrecautions
            code
            gefcoSend
            tankCapacity
            canMileage
            companyVehiclesId
            createdAt
            updatedAt
            vehicleVehicleCategoryId
            vehicleBrandBrandName
            vehicleModeleId
            vehicleDeviceImei
            __typename
          }
          alertId
          alert {
            id
            name
            type
            disabled
            instantaneous
            reportFrequency
            byMail
            bySms
            byWhatsapp
            smsTemplate
            emailTemplate
            sentToDriver
            phones
            emails
            extra
            createdAt
            updatedAt
            alertCompanyId
            alertZoneId
            __typename
          }
          isFlespi
          createdAt
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      extra
      zone {
        id
        name
        lat
        lng
        radius
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      alertCompanyId
      alertZoneId
      __typename
    }
  }
`;
export const onCreateVehicleAlerts = /* GraphQL */ `
  subscription OnCreateVehicleAlerts(
    $filter: ModelSubscriptionVehicleAlertsFilterInput
  ) {
    onCreateVehicleAlerts(filter: $filter) {
      id
      vehicleImmat
      vehicle {
        immat
        year
        fuelType
        consumption
        maxSpeed
        seatCount
        icon
        picture {
          bucket
          region
          key
          __typename
        }
        kilometerage
        kilometerPrice
        kilometerageStart
        kilometerageDay
        kilometerageLastUpdate
        timeRunning
        counterValue
        co2
        lastModificationDate
        rollingTimeStart
        rollingTimeDay
        locations
        installationPrecautions
        code
        vehicleCategory {
          id
          category
          description
          createdAt
          updatedAt
          __typename
        }
        brand {
          brandName
          logo {
            bucket
            region
            key
            __typename
          }
          models {
            nextToken
            __typename
          }
          createdAt
          updatedAt
          __typename
        }
        modele {
          id
          modele
          brand {
            brandName
            createdAt
            updatedAt
            __typename
          }
          createdAt
          updatedAt
          vehicleBrandModelsBrandName
          __typename
        }
        gefcoSend
        tankCapacity
        canMileage
        companyVehiclesId
        company {
          id
          name
          siret
          address
          postalCode
          city
          countryCode
          contact
          email
          mobile
          phone
          fax
          creationDate
          subscriptionDate
          keyedStart
          users {
            nextToken
            __typename
          }
          vehicles {
            nextToken
            __typename
          }
          drivers {
            nextToken
            __typename
          }
          trames {
            nextToken
            __typename
          }
          createdAt
          updatedAt
          __typename
        }
        device {
          imei
          protocolId
          sim
          vehicle {
            immat
            year
            fuelType
            consumption
            maxSpeed
            seatCount
            icon
            kilometerage
            kilometerPrice
            kilometerageStart
            kilometerageDay
            kilometerageLastUpdate
            timeRunning
            counterValue
            co2
            lastModificationDate
            rollingTimeStart
            rollingTimeDay
            locations
            installationPrecautions
            code
            gefcoSend
            tankCapacity
            canMileage
            companyVehiclesId
            createdAt
            updatedAt
            vehicleVehicleCategoryId
            vehicleBrandBrandName
            vehicleModeleId
            vehicleDeviceImei
            __typename
          }
          createdAt
          updatedAt
          deviceVehicleImmat
          __typename
        }
        alerts {
          items {
            id
            vehicleImmat
            alertId
            isFlespi
            createdAt
            updatedAt
            __typename
          }
          nextToken
          __typename
        }
        tags {
          items {
            id
            vehicleImmat
            tagId
            createdAt
            updatedAt
            __typename
          }
          nextToken
          __typename
        }
        createdAt
        updatedAt
        vehicleVehicleCategoryId
        vehicleBrandBrandName
        vehicleModeleId
        vehicleDeviceImei
        __typename
      }
      alertId
      alert {
        id
        name
        type
        disabled
        instantaneous
        reportFrequency
        byMail
        bySms
        byWhatsapp
        smsTemplate
        emailTemplate
        sentToDriver
        phones
        emails
        company {
          id
          name
          siret
          address
          postalCode
          city
          countryCode
          contact
          email
          mobile
          phone
          fax
          creationDate
          subscriptionDate
          keyedStart
          users {
            nextToken
            __typename
          }
          vehicles {
            nextToken
            __typename
          }
          drivers {
            nextToken
            __typename
          }
          trames {
            nextToken
            __typename
          }
          createdAt
          updatedAt
          __typename
        }
        vehicles {
          items {
            id
            vehicleImmat
            alertId
            isFlespi
            createdAt
            updatedAt
            __typename
          }
          nextToken
          __typename
        }
        extra
        zone {
          id
          name
          lat
          lng
          radius
          createdAt
          updatedAt
          __typename
        }
        createdAt
        updatedAt
        alertCompanyId
        alertZoneId
        __typename
      }
      isFlespi
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateVehicleAlerts = /* GraphQL */ `
  subscription OnUpdateVehicleAlerts(
    $filter: ModelSubscriptionVehicleAlertsFilterInput
  ) {
    onUpdateVehicleAlerts(filter: $filter) {
      id
      vehicleImmat
      vehicle {
        immat
        year
        fuelType
        consumption
        maxSpeed
        seatCount
        icon
        picture {
          bucket
          region
          key
          __typename
        }
        kilometerage
        kilometerPrice
        kilometerageStart
        kilometerageDay
        kilometerageLastUpdate
        timeRunning
        counterValue
        co2
        lastModificationDate
        rollingTimeStart
        rollingTimeDay
        locations
        installationPrecautions
        code
        vehicleCategory {
          id
          category
          description
          createdAt
          updatedAt
          __typename
        }
        brand {
          brandName
          logo {
            bucket
            region
            key
            __typename
          }
          models {
            nextToken
            __typename
          }
          createdAt
          updatedAt
          __typename
        }
        modele {
          id
          modele
          brand {
            brandName
            createdAt
            updatedAt
            __typename
          }
          createdAt
          updatedAt
          vehicleBrandModelsBrandName
          __typename
        }
        gefcoSend
        tankCapacity
        canMileage
        companyVehiclesId
        company {
          id
          name
          siret
          address
          postalCode
          city
          countryCode
          contact
          email
          mobile
          phone
          fax
          creationDate
          subscriptionDate
          keyedStart
          users {
            nextToken
            __typename
          }
          vehicles {
            nextToken
            __typename
          }
          drivers {
            nextToken
            __typename
          }
          trames {
            nextToken
            __typename
          }
          createdAt
          updatedAt
          __typename
        }
        device {
          imei
          protocolId
          sim
          vehicle {
            immat
            year
            fuelType
            consumption
            maxSpeed
            seatCount
            icon
            kilometerage
            kilometerPrice
            kilometerageStart
            kilometerageDay
            kilometerageLastUpdate
            timeRunning
            counterValue
            co2
            lastModificationDate
            rollingTimeStart
            rollingTimeDay
            locations
            installationPrecautions
            code
            gefcoSend
            tankCapacity
            canMileage
            companyVehiclesId
            createdAt
            updatedAt
            vehicleVehicleCategoryId
            vehicleBrandBrandName
            vehicleModeleId
            vehicleDeviceImei
            __typename
          }
          createdAt
          updatedAt
          deviceVehicleImmat
          __typename
        }
        alerts {
          items {
            id
            vehicleImmat
            alertId
            isFlespi
            createdAt
            updatedAt
            __typename
          }
          nextToken
          __typename
        }
        tags {
          items {
            id
            vehicleImmat
            tagId
            createdAt
            updatedAt
            __typename
          }
          nextToken
          __typename
        }
        createdAt
        updatedAt
        vehicleVehicleCategoryId
        vehicleBrandBrandName
        vehicleModeleId
        vehicleDeviceImei
        __typename
      }
      alertId
      alert {
        id
        name
        type
        disabled
        instantaneous
        reportFrequency
        byMail
        bySms
        byWhatsapp
        smsTemplate
        emailTemplate
        sentToDriver
        phones
        emails
        company {
          id
          name
          siret
          address
          postalCode
          city
          countryCode
          contact
          email
          mobile
          phone
          fax
          creationDate
          subscriptionDate
          keyedStart
          users {
            nextToken
            __typename
          }
          vehicles {
            nextToken
            __typename
          }
          drivers {
            nextToken
            __typename
          }
          trames {
            nextToken
            __typename
          }
          createdAt
          updatedAt
          __typename
        }
        vehicles {
          items {
            id
            vehicleImmat
            alertId
            isFlespi
            createdAt
            updatedAt
            __typename
          }
          nextToken
          __typename
        }
        extra
        zone {
          id
          name
          lat
          lng
          radius
          createdAt
          updatedAt
          __typename
        }
        createdAt
        updatedAt
        alertCompanyId
        alertZoneId
        __typename
      }
      isFlespi
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteVehicleAlerts = /* GraphQL */ `
  subscription OnDeleteVehicleAlerts(
    $filter: ModelSubscriptionVehicleAlertsFilterInput
  ) {
    onDeleteVehicleAlerts(filter: $filter) {
      id
      vehicleImmat
      vehicle {
        immat
        year
        fuelType
        consumption
        maxSpeed
        seatCount
        icon
        picture {
          bucket
          region
          key
          __typename
        }
        kilometerage
        kilometerPrice
        kilometerageStart
        kilometerageDay
        kilometerageLastUpdate
        timeRunning
        counterValue
        co2
        lastModificationDate
        rollingTimeStart
        rollingTimeDay
        locations
        installationPrecautions
        code
        vehicleCategory {
          id
          category
          description
          createdAt
          updatedAt
          __typename
        }
        brand {
          brandName
          logo {
            bucket
            region
            key
            __typename
          }
          models {
            nextToken
            __typename
          }
          createdAt
          updatedAt
          __typename
        }
        modele {
          id
          modele
          brand {
            brandName
            createdAt
            updatedAt
            __typename
          }
          createdAt
          updatedAt
          vehicleBrandModelsBrandName
          __typename
        }
        gefcoSend
        tankCapacity
        canMileage
        companyVehiclesId
        company {
          id
          name
          siret
          address
          postalCode
          city
          countryCode
          contact
          email
          mobile
          phone
          fax
          creationDate
          subscriptionDate
          keyedStart
          users {
            nextToken
            __typename
          }
          vehicles {
            nextToken
            __typename
          }
          drivers {
            nextToken
            __typename
          }
          trames {
            nextToken
            __typename
          }
          createdAt
          updatedAt
          __typename
        }
        device {
          imei
          protocolId
          sim
          vehicle {
            immat
            year
            fuelType
            consumption
            maxSpeed
            seatCount
            icon
            kilometerage
            kilometerPrice
            kilometerageStart
            kilometerageDay
            kilometerageLastUpdate
            timeRunning
            counterValue
            co2
            lastModificationDate
            rollingTimeStart
            rollingTimeDay
            locations
            installationPrecautions
            code
            gefcoSend
            tankCapacity
            canMileage
            companyVehiclesId
            createdAt
            updatedAt
            vehicleVehicleCategoryId
            vehicleBrandBrandName
            vehicleModeleId
            vehicleDeviceImei
            __typename
          }
          createdAt
          updatedAt
          deviceVehicleImmat
          __typename
        }
        alerts {
          items {
            id
            vehicleImmat
            alertId
            isFlespi
            createdAt
            updatedAt
            __typename
          }
          nextToken
          __typename
        }
        tags {
          items {
            id
            vehicleImmat
            tagId
            createdAt
            updatedAt
            __typename
          }
          nextToken
          __typename
        }
        createdAt
        updatedAt
        vehicleVehicleCategoryId
        vehicleBrandBrandName
        vehicleModeleId
        vehicleDeviceImei
        __typename
      }
      alertId
      alert {
        id
        name
        type
        disabled
        instantaneous
        reportFrequency
        byMail
        bySms
        byWhatsapp
        smsTemplate
        emailTemplate
        sentToDriver
        phones
        emails
        company {
          id
          name
          siret
          address
          postalCode
          city
          countryCode
          contact
          email
          mobile
          phone
          fax
          creationDate
          subscriptionDate
          keyedStart
          users {
            nextToken
            __typename
          }
          vehicles {
            nextToken
            __typename
          }
          drivers {
            nextToken
            __typename
          }
          trames {
            nextToken
            __typename
          }
          createdAt
          updatedAt
          __typename
        }
        vehicles {
          items {
            id
            vehicleImmat
            alertId
            isFlespi
            createdAt
            updatedAt
            __typename
          }
          nextToken
          __typename
        }
        extra
        zone {
          id
          name
          lat
          lng
          radius
          createdAt
          updatedAt
          __typename
        }
        createdAt
        updatedAt
        alertCompanyId
        alertZoneId
        __typename
      }
      isFlespi
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateAlertDefinition = /* GraphQL */ `
  subscription OnCreateAlertDefinition(
    $filter: ModelSubscriptionAlertDefinitionFilterInput
  ) {
    onCreateAlertDefinition(filter: $filter) {
      key
      label
      description
      isFlespi
      calculator
      variables
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateAlertDefinition = /* GraphQL */ `
  subscription OnUpdateAlertDefinition(
    $filter: ModelSubscriptionAlertDefinitionFilterInput
  ) {
    onUpdateAlertDefinition(filter: $filter) {
      key
      label
      description
      isFlespi
      calculator
      variables
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteAlertDefinition = /* GraphQL */ `
  subscription OnDeleteAlertDefinition(
    $filter: ModelSubscriptionAlertDefinitionFilterInput
  ) {
    onDeleteAlertDefinition(filter: $filter) {
      key
      label
      description
      isFlespi
      calculator
      variables
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateVehicleAlertState = /* GraphQL */ `
  subscription OnCreateVehicleAlertState(
    $filter: ModelSubscriptionVehicleAlertStateFilterInput
  ) {
    onCreateVehicleAlertState(filter: $filter) {
      id
      alert
      state
      timestamp
      zone {
        id
        name
        lat
        lng
        radius
        createdAt
        updatedAt
        __typename
      }
      vehicle {
        immat
        year
        fuelType
        consumption
        maxSpeed
        seatCount
        icon
        picture {
          bucket
          region
          key
          __typename
        }
        kilometerage
        kilometerPrice
        kilometerageStart
        kilometerageDay
        kilometerageLastUpdate
        timeRunning
        counterValue
        co2
        lastModificationDate
        rollingTimeStart
        rollingTimeDay
        locations
        installationPrecautions
        code
        vehicleCategory {
          id
          category
          description
          createdAt
          updatedAt
          __typename
        }
        brand {
          brandName
          logo {
            bucket
            region
            key
            __typename
          }
          models {
            nextToken
            __typename
          }
          createdAt
          updatedAt
          __typename
        }
        modele {
          id
          modele
          brand {
            brandName
            createdAt
            updatedAt
            __typename
          }
          createdAt
          updatedAt
          vehicleBrandModelsBrandName
          __typename
        }
        gefcoSend
        tankCapacity
        canMileage
        companyVehiclesId
        company {
          id
          name
          siret
          address
          postalCode
          city
          countryCode
          contact
          email
          mobile
          phone
          fax
          creationDate
          subscriptionDate
          keyedStart
          users {
            nextToken
            __typename
          }
          vehicles {
            nextToken
            __typename
          }
          drivers {
            nextToken
            __typename
          }
          trames {
            nextToken
            __typename
          }
          createdAt
          updatedAt
          __typename
        }
        device {
          imei
          protocolId
          sim
          vehicle {
            immat
            year
            fuelType
            consumption
            maxSpeed
            seatCount
            icon
            kilometerage
            kilometerPrice
            kilometerageStart
            kilometerageDay
            kilometerageLastUpdate
            timeRunning
            counterValue
            co2
            lastModificationDate
            rollingTimeStart
            rollingTimeDay
            locations
            installationPrecautions
            code
            gefcoSend
            tankCapacity
            canMileage
            companyVehiclesId
            createdAt
            updatedAt
            vehicleVehicleCategoryId
            vehicleBrandBrandName
            vehicleModeleId
            vehicleDeviceImei
            __typename
          }
          createdAt
          updatedAt
          deviceVehicleImmat
          __typename
        }
        alerts {
          items {
            id
            vehicleImmat
            alertId
            isFlespi
            createdAt
            updatedAt
            __typename
          }
          nextToken
          __typename
        }
        tags {
          items {
            id
            vehicleImmat
            tagId
            createdAt
            updatedAt
            __typename
          }
          nextToken
          __typename
        }
        createdAt
        updatedAt
        vehicleVehicleCategoryId
        vehicleBrandBrandName
        vehicleModeleId
        vehicleDeviceImei
        __typename
      }
      createdAt
      updatedAt
      vehicleAlertStateZoneId
      vehicleAlertStateVehicleImmat
      __typename
    }
  }
`;
export const onUpdateVehicleAlertState = /* GraphQL */ `
  subscription OnUpdateVehicleAlertState(
    $filter: ModelSubscriptionVehicleAlertStateFilterInput
  ) {
    onUpdateVehicleAlertState(filter: $filter) {
      id
      alert
      state
      timestamp
      zone {
        id
        name
        lat
        lng
        radius
        createdAt
        updatedAt
        __typename
      }
      vehicle {
        immat
        year
        fuelType
        consumption
        maxSpeed
        seatCount
        icon
        picture {
          bucket
          region
          key
          __typename
        }
        kilometerage
        kilometerPrice
        kilometerageStart
        kilometerageDay
        kilometerageLastUpdate
        timeRunning
        counterValue
        co2
        lastModificationDate
        rollingTimeStart
        rollingTimeDay
        locations
        installationPrecautions
        code
        vehicleCategory {
          id
          category
          description
          createdAt
          updatedAt
          __typename
        }
        brand {
          brandName
          logo {
            bucket
            region
            key
            __typename
          }
          models {
            nextToken
            __typename
          }
          createdAt
          updatedAt
          __typename
        }
        modele {
          id
          modele
          brand {
            brandName
            createdAt
            updatedAt
            __typename
          }
          createdAt
          updatedAt
          vehicleBrandModelsBrandName
          __typename
        }
        gefcoSend
        tankCapacity
        canMileage
        companyVehiclesId
        company {
          id
          name
          siret
          address
          postalCode
          city
          countryCode
          contact
          email
          mobile
          phone
          fax
          creationDate
          subscriptionDate
          keyedStart
          users {
            nextToken
            __typename
          }
          vehicles {
            nextToken
            __typename
          }
          drivers {
            nextToken
            __typename
          }
          trames {
            nextToken
            __typename
          }
          createdAt
          updatedAt
          __typename
        }
        device {
          imei
          protocolId
          sim
          vehicle {
            immat
            year
            fuelType
            consumption
            maxSpeed
            seatCount
            icon
            kilometerage
            kilometerPrice
            kilometerageStart
            kilometerageDay
            kilometerageLastUpdate
            timeRunning
            counterValue
            co2
            lastModificationDate
            rollingTimeStart
            rollingTimeDay
            locations
            installationPrecautions
            code
            gefcoSend
            tankCapacity
            canMileage
            companyVehiclesId
            createdAt
            updatedAt
            vehicleVehicleCategoryId
            vehicleBrandBrandName
            vehicleModeleId
            vehicleDeviceImei
            __typename
          }
          createdAt
          updatedAt
          deviceVehicleImmat
          __typename
        }
        alerts {
          items {
            id
            vehicleImmat
            alertId
            isFlespi
            createdAt
            updatedAt
            __typename
          }
          nextToken
          __typename
        }
        tags {
          items {
            id
            vehicleImmat
            tagId
            createdAt
            updatedAt
            __typename
          }
          nextToken
          __typename
        }
        createdAt
        updatedAt
        vehicleVehicleCategoryId
        vehicleBrandBrandName
        vehicleModeleId
        vehicleDeviceImei
        __typename
      }
      createdAt
      updatedAt
      vehicleAlertStateZoneId
      vehicleAlertStateVehicleImmat
      __typename
    }
  }
`;
export const onDeleteVehicleAlertState = /* GraphQL */ `
  subscription OnDeleteVehicleAlertState(
    $filter: ModelSubscriptionVehicleAlertStateFilterInput
  ) {
    onDeleteVehicleAlertState(filter: $filter) {
      id
      alert
      state
      timestamp
      zone {
        id
        name
        lat
        lng
        radius
        createdAt
        updatedAt
        __typename
      }
      vehicle {
        immat
        year
        fuelType
        consumption
        maxSpeed
        seatCount
        icon
        picture {
          bucket
          region
          key
          __typename
        }
        kilometerage
        kilometerPrice
        kilometerageStart
        kilometerageDay
        kilometerageLastUpdate
        timeRunning
        counterValue
        co2
        lastModificationDate
        rollingTimeStart
        rollingTimeDay
        locations
        installationPrecautions
        code
        vehicleCategory {
          id
          category
          description
          createdAt
          updatedAt
          __typename
        }
        brand {
          brandName
          logo {
            bucket
            region
            key
            __typename
          }
          models {
            nextToken
            __typename
          }
          createdAt
          updatedAt
          __typename
        }
        modele {
          id
          modele
          brand {
            brandName
            createdAt
            updatedAt
            __typename
          }
          createdAt
          updatedAt
          vehicleBrandModelsBrandName
          __typename
        }
        gefcoSend
        tankCapacity
        canMileage
        companyVehiclesId
        company {
          id
          name
          siret
          address
          postalCode
          city
          countryCode
          contact
          email
          mobile
          phone
          fax
          creationDate
          subscriptionDate
          keyedStart
          users {
            nextToken
            __typename
          }
          vehicles {
            nextToken
            __typename
          }
          drivers {
            nextToken
            __typename
          }
          trames {
            nextToken
            __typename
          }
          createdAt
          updatedAt
          __typename
        }
        device {
          imei
          protocolId
          sim
          vehicle {
            immat
            year
            fuelType
            consumption
            maxSpeed
            seatCount
            icon
            kilometerage
            kilometerPrice
            kilometerageStart
            kilometerageDay
            kilometerageLastUpdate
            timeRunning
            counterValue
            co2
            lastModificationDate
            rollingTimeStart
            rollingTimeDay
            locations
            installationPrecautions
            code
            gefcoSend
            tankCapacity
            canMileage
            companyVehiclesId
            createdAt
            updatedAt
            vehicleVehicleCategoryId
            vehicleBrandBrandName
            vehicleModeleId
            vehicleDeviceImei
            __typename
          }
          createdAt
          updatedAt
          deviceVehicleImmat
          __typename
        }
        alerts {
          items {
            id
            vehicleImmat
            alertId
            isFlespi
            createdAt
            updatedAt
            __typename
          }
          nextToken
          __typename
        }
        tags {
          items {
            id
            vehicleImmat
            tagId
            createdAt
            updatedAt
            __typename
          }
          nextToken
          __typename
        }
        createdAt
        updatedAt
        vehicleVehicleCategoryId
        vehicleBrandBrandName
        vehicleModeleId
        vehicleDeviceImei
        __typename
      }
      createdAt
      updatedAt
      vehicleAlertStateZoneId
      vehicleAlertStateVehicleImmat
      __typename
    }
  }
`;
export const onCreateAlertHistory = /* GraphQL */ `
  subscription OnCreateAlertHistory(
    $filter: ModelSubscriptionAlertHistoryFilterInput
  ) {
    onCreateAlertHistory(filter: $filter) {
      id
      type
      imei
      vehicle {
        immat
        year
        fuelType
        consumption
        maxSpeed
        seatCount
        icon
        picture {
          bucket
          region
          key
          __typename
        }
        kilometerage
        kilometerPrice
        kilometerageStart
        kilometerageDay
        kilometerageLastUpdate
        timeRunning
        counterValue
        co2
        lastModificationDate
        rollingTimeStart
        rollingTimeDay
        locations
        installationPrecautions
        code
        vehicleCategory {
          id
          category
          description
          createdAt
          updatedAt
          __typename
        }
        brand {
          brandName
          logo {
            bucket
            region
            key
            __typename
          }
          models {
            nextToken
            __typename
          }
          createdAt
          updatedAt
          __typename
        }
        modele {
          id
          modele
          brand {
            brandName
            createdAt
            updatedAt
            __typename
          }
          createdAt
          updatedAt
          vehicleBrandModelsBrandName
          __typename
        }
        gefcoSend
        tankCapacity
        canMileage
        companyVehiclesId
        company {
          id
          name
          siret
          address
          postalCode
          city
          countryCode
          contact
          email
          mobile
          phone
          fax
          creationDate
          subscriptionDate
          keyedStart
          users {
            nextToken
            __typename
          }
          vehicles {
            nextToken
            __typename
          }
          drivers {
            nextToken
            __typename
          }
          trames {
            nextToken
            __typename
          }
          createdAt
          updatedAt
          __typename
        }
        device {
          imei
          protocolId
          sim
          vehicle {
            immat
            year
            fuelType
            consumption
            maxSpeed
            seatCount
            icon
            kilometerage
            kilometerPrice
            kilometerageStart
            kilometerageDay
            kilometerageLastUpdate
            timeRunning
            counterValue
            co2
            lastModificationDate
            rollingTimeStart
            rollingTimeDay
            locations
            installationPrecautions
            code
            gefcoSend
            tankCapacity
            canMileage
            companyVehiclesId
            createdAt
            updatedAt
            vehicleVehicleCategoryId
            vehicleBrandBrandName
            vehicleModeleId
            vehicleDeviceImei
            __typename
          }
          createdAt
          updatedAt
          deviceVehicleImmat
          __typename
        }
        alerts {
          items {
            id
            vehicleImmat
            alertId
            isFlespi
            createdAt
            updatedAt
            __typename
          }
          nextToken
          __typename
        }
        tags {
          items {
            id
            vehicleImmat
            tagId
            createdAt
            updatedAt
            __typename
          }
          nextToken
          __typename
        }
        createdAt
        updatedAt
        vehicleVehicleCategoryId
        vehicleBrandBrandName
        vehicleModeleId
        vehicleDeviceImei
        __typename
      }
      driver {
        sub
        firstname
        lastname
        fullname
        birthDate
        drivingLicenseNumber
        drivingLicenseType
        job
        hiringDate
        comment
        driverKey
        email
        mobile
        lastModificationDate
        code
        address
        agencyId
        cdc
        pdm
        nni
        companyDriversId
        company {
          id
          name
          siret
          address
          postalCode
          city
          countryCode
          contact
          email
          mobile
          phone
          fax
          creationDate
          subscriptionDate
          keyedStart
          users {
            nextToken
            __typename
          }
          vehicles {
            nextToken
            __typename
          }
          drivers {
            nextToken
            __typename
          }
          trames {
            nextToken
            __typename
          }
          createdAt
          updatedAt
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      company {
        id
        name
        siret
        address
        postalCode
        city
        countryCode
        contact
        email
        mobile
        phone
        fax
        creationDate
        subscriptionDate
        keyedStart
        users {
          items {
            sub
            firstname
            lastname
            mobile
            beginDate
            endDate
            mappingId
            languageCode
            lastModificationDate
            showReport
            dispatcher
            applicationVersion
            themeId
            companyUsersId
            createdAt
            updatedAt
            __typename
          }
          nextToken
          __typename
        }
        vehicles {
          items {
            immat
            year
            fuelType
            consumption
            maxSpeed
            seatCount
            icon
            kilometerage
            kilometerPrice
            kilometerageStart
            kilometerageDay
            kilometerageLastUpdate
            timeRunning
            counterValue
            co2
            lastModificationDate
            rollingTimeStart
            rollingTimeDay
            locations
            installationPrecautions
            code
            gefcoSend
            tankCapacity
            canMileage
            companyVehiclesId
            createdAt
            updatedAt
            vehicleVehicleCategoryId
            vehicleBrandBrandName
            vehicleModeleId
            vehicleDeviceImei
            __typename
          }
          nextToken
          __typename
        }
        drivers {
          items {
            sub
            firstname
            lastname
            fullname
            birthDate
            drivingLicenseNumber
            drivingLicenseType
            job
            hiringDate
            comment
            driverKey
            email
            mobile
            lastModificationDate
            code
            address
            agencyId
            cdc
            pdm
            nni
            companyDriversId
            createdAt
            updatedAt
            __typename
          }
          nextToken
          __typename
        }
        trames {
          items {
            id
            speed
            lat
            lng
            address
            azimut
            immobilisation
            timestamp
            state
            fuel
            ibuttonCode
            companyId
            driverFullName
            vehicleBrandName
            companyTramesId
            processor
            createdAt
            updatedAt
            trameDriverSub
            trameVehicleImmat
            __typename
          }
          nextToken
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      timestamp
      config {
        id
        name
        type
        disabled
        instantaneous
        reportFrequency
        byMail
        bySms
        byWhatsapp
        smsTemplate
        emailTemplate
        sentToDriver
        phones
        emails
        company {
          id
          name
          siret
          address
          postalCode
          city
          countryCode
          contact
          email
          mobile
          phone
          fax
          creationDate
          subscriptionDate
          keyedStart
          users {
            nextToken
            __typename
          }
          vehicles {
            nextToken
            __typename
          }
          drivers {
            nextToken
            __typename
          }
          trames {
            nextToken
            __typename
          }
          createdAt
          updatedAt
          __typename
        }
        vehicles {
          items {
            id
            vehicleImmat
            alertId
            isFlespi
            createdAt
            updatedAt
            __typename
          }
          nextToken
          __typename
        }
        extra
        zone {
          id
          name
          lat
          lng
          radius
          createdAt
          updatedAt
          __typename
        }
        createdAt
        updatedAt
        alertCompanyId
        alertZoneId
        __typename
      }
      data
      createdAt
      updatedAt
      alertHistoryVehicleImmat
      alertHistoryDriverSub
      alertHistoryCompanyId
      alertHistoryConfigId
      __typename
    }
  }
`;
export const onUpdateAlertHistory = /* GraphQL */ `
  subscription OnUpdateAlertHistory(
    $filter: ModelSubscriptionAlertHistoryFilterInput
  ) {
    onUpdateAlertHistory(filter: $filter) {
      id
      type
      imei
      vehicle {
        immat
        year
        fuelType
        consumption
        maxSpeed
        seatCount
        icon
        picture {
          bucket
          region
          key
          __typename
        }
        kilometerage
        kilometerPrice
        kilometerageStart
        kilometerageDay
        kilometerageLastUpdate
        timeRunning
        counterValue
        co2
        lastModificationDate
        rollingTimeStart
        rollingTimeDay
        locations
        installationPrecautions
        code
        vehicleCategory {
          id
          category
          description
          createdAt
          updatedAt
          __typename
        }
        brand {
          brandName
          logo {
            bucket
            region
            key
            __typename
          }
          models {
            nextToken
            __typename
          }
          createdAt
          updatedAt
          __typename
        }
        modele {
          id
          modele
          brand {
            brandName
            createdAt
            updatedAt
            __typename
          }
          createdAt
          updatedAt
          vehicleBrandModelsBrandName
          __typename
        }
        gefcoSend
        tankCapacity
        canMileage
        companyVehiclesId
        company {
          id
          name
          siret
          address
          postalCode
          city
          countryCode
          contact
          email
          mobile
          phone
          fax
          creationDate
          subscriptionDate
          keyedStart
          users {
            nextToken
            __typename
          }
          vehicles {
            nextToken
            __typename
          }
          drivers {
            nextToken
            __typename
          }
          trames {
            nextToken
            __typename
          }
          createdAt
          updatedAt
          __typename
        }
        device {
          imei
          protocolId
          sim
          vehicle {
            immat
            year
            fuelType
            consumption
            maxSpeed
            seatCount
            icon
            kilometerage
            kilometerPrice
            kilometerageStart
            kilometerageDay
            kilometerageLastUpdate
            timeRunning
            counterValue
            co2
            lastModificationDate
            rollingTimeStart
            rollingTimeDay
            locations
            installationPrecautions
            code
            gefcoSend
            tankCapacity
            canMileage
            companyVehiclesId
            createdAt
            updatedAt
            vehicleVehicleCategoryId
            vehicleBrandBrandName
            vehicleModeleId
            vehicleDeviceImei
            __typename
          }
          createdAt
          updatedAt
          deviceVehicleImmat
          __typename
        }
        alerts {
          items {
            id
            vehicleImmat
            alertId
            isFlespi
            createdAt
            updatedAt
            __typename
          }
          nextToken
          __typename
        }
        tags {
          items {
            id
            vehicleImmat
            tagId
            createdAt
            updatedAt
            __typename
          }
          nextToken
          __typename
        }
        createdAt
        updatedAt
        vehicleVehicleCategoryId
        vehicleBrandBrandName
        vehicleModeleId
        vehicleDeviceImei
        __typename
      }
      driver {
        sub
        firstname
        lastname
        fullname
        birthDate
        drivingLicenseNumber
        drivingLicenseType
        job
        hiringDate
        comment
        driverKey
        email
        mobile
        lastModificationDate
        code
        address
        agencyId
        cdc
        pdm
        nni
        companyDriversId
        company {
          id
          name
          siret
          address
          postalCode
          city
          countryCode
          contact
          email
          mobile
          phone
          fax
          creationDate
          subscriptionDate
          keyedStart
          users {
            nextToken
            __typename
          }
          vehicles {
            nextToken
            __typename
          }
          drivers {
            nextToken
            __typename
          }
          trames {
            nextToken
            __typename
          }
          createdAt
          updatedAt
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      company {
        id
        name
        siret
        address
        postalCode
        city
        countryCode
        contact
        email
        mobile
        phone
        fax
        creationDate
        subscriptionDate
        keyedStart
        users {
          items {
            sub
            firstname
            lastname
            mobile
            beginDate
            endDate
            mappingId
            languageCode
            lastModificationDate
            showReport
            dispatcher
            applicationVersion
            themeId
            companyUsersId
            createdAt
            updatedAt
            __typename
          }
          nextToken
          __typename
        }
        vehicles {
          items {
            immat
            year
            fuelType
            consumption
            maxSpeed
            seatCount
            icon
            kilometerage
            kilometerPrice
            kilometerageStart
            kilometerageDay
            kilometerageLastUpdate
            timeRunning
            counterValue
            co2
            lastModificationDate
            rollingTimeStart
            rollingTimeDay
            locations
            installationPrecautions
            code
            gefcoSend
            tankCapacity
            canMileage
            companyVehiclesId
            createdAt
            updatedAt
            vehicleVehicleCategoryId
            vehicleBrandBrandName
            vehicleModeleId
            vehicleDeviceImei
            __typename
          }
          nextToken
          __typename
        }
        drivers {
          items {
            sub
            firstname
            lastname
            fullname
            birthDate
            drivingLicenseNumber
            drivingLicenseType
            job
            hiringDate
            comment
            driverKey
            email
            mobile
            lastModificationDate
            code
            address
            agencyId
            cdc
            pdm
            nni
            companyDriversId
            createdAt
            updatedAt
            __typename
          }
          nextToken
          __typename
        }
        trames {
          items {
            id
            speed
            lat
            lng
            address
            azimut
            immobilisation
            timestamp
            state
            fuel
            ibuttonCode
            companyId
            driverFullName
            vehicleBrandName
            companyTramesId
            processor
            createdAt
            updatedAt
            trameDriverSub
            trameVehicleImmat
            __typename
          }
          nextToken
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      timestamp
      config {
        id
        name
        type
        disabled
        instantaneous
        reportFrequency
        byMail
        bySms
        byWhatsapp
        smsTemplate
        emailTemplate
        sentToDriver
        phones
        emails
        company {
          id
          name
          siret
          address
          postalCode
          city
          countryCode
          contact
          email
          mobile
          phone
          fax
          creationDate
          subscriptionDate
          keyedStart
          users {
            nextToken
            __typename
          }
          vehicles {
            nextToken
            __typename
          }
          drivers {
            nextToken
            __typename
          }
          trames {
            nextToken
            __typename
          }
          createdAt
          updatedAt
          __typename
        }
        vehicles {
          items {
            id
            vehicleImmat
            alertId
            isFlespi
            createdAt
            updatedAt
            __typename
          }
          nextToken
          __typename
        }
        extra
        zone {
          id
          name
          lat
          lng
          radius
          createdAt
          updatedAt
          __typename
        }
        createdAt
        updatedAt
        alertCompanyId
        alertZoneId
        __typename
      }
      data
      createdAt
      updatedAt
      alertHistoryVehicleImmat
      alertHistoryDriverSub
      alertHistoryCompanyId
      alertHistoryConfigId
      __typename
    }
  }
`;
export const onDeleteAlertHistory = /* GraphQL */ `
  subscription OnDeleteAlertHistory(
    $filter: ModelSubscriptionAlertHistoryFilterInput
  ) {
    onDeleteAlertHistory(filter: $filter) {
      id
      type
      imei
      vehicle {
        immat
        year
        fuelType
        consumption
        maxSpeed
        seatCount
        icon
        picture {
          bucket
          region
          key
          __typename
        }
        kilometerage
        kilometerPrice
        kilometerageStart
        kilometerageDay
        kilometerageLastUpdate
        timeRunning
        counterValue
        co2
        lastModificationDate
        rollingTimeStart
        rollingTimeDay
        locations
        installationPrecautions
        code
        vehicleCategory {
          id
          category
          description
          createdAt
          updatedAt
          __typename
        }
        brand {
          brandName
          logo {
            bucket
            region
            key
            __typename
          }
          models {
            nextToken
            __typename
          }
          createdAt
          updatedAt
          __typename
        }
        modele {
          id
          modele
          brand {
            brandName
            createdAt
            updatedAt
            __typename
          }
          createdAt
          updatedAt
          vehicleBrandModelsBrandName
          __typename
        }
        gefcoSend
        tankCapacity
        canMileage
        companyVehiclesId
        company {
          id
          name
          siret
          address
          postalCode
          city
          countryCode
          contact
          email
          mobile
          phone
          fax
          creationDate
          subscriptionDate
          keyedStart
          users {
            nextToken
            __typename
          }
          vehicles {
            nextToken
            __typename
          }
          drivers {
            nextToken
            __typename
          }
          trames {
            nextToken
            __typename
          }
          createdAt
          updatedAt
          __typename
        }
        device {
          imei
          protocolId
          sim
          vehicle {
            immat
            year
            fuelType
            consumption
            maxSpeed
            seatCount
            icon
            kilometerage
            kilometerPrice
            kilometerageStart
            kilometerageDay
            kilometerageLastUpdate
            timeRunning
            counterValue
            co2
            lastModificationDate
            rollingTimeStart
            rollingTimeDay
            locations
            installationPrecautions
            code
            gefcoSend
            tankCapacity
            canMileage
            companyVehiclesId
            createdAt
            updatedAt
            vehicleVehicleCategoryId
            vehicleBrandBrandName
            vehicleModeleId
            vehicleDeviceImei
            __typename
          }
          createdAt
          updatedAt
          deviceVehicleImmat
          __typename
        }
        alerts {
          items {
            id
            vehicleImmat
            alertId
            isFlespi
            createdAt
            updatedAt
            __typename
          }
          nextToken
          __typename
        }
        tags {
          items {
            id
            vehicleImmat
            tagId
            createdAt
            updatedAt
            __typename
          }
          nextToken
          __typename
        }
        createdAt
        updatedAt
        vehicleVehicleCategoryId
        vehicleBrandBrandName
        vehicleModeleId
        vehicleDeviceImei
        __typename
      }
      driver {
        sub
        firstname
        lastname
        fullname
        birthDate
        drivingLicenseNumber
        drivingLicenseType
        job
        hiringDate
        comment
        driverKey
        email
        mobile
        lastModificationDate
        code
        address
        agencyId
        cdc
        pdm
        nni
        companyDriversId
        company {
          id
          name
          siret
          address
          postalCode
          city
          countryCode
          contact
          email
          mobile
          phone
          fax
          creationDate
          subscriptionDate
          keyedStart
          users {
            nextToken
            __typename
          }
          vehicles {
            nextToken
            __typename
          }
          drivers {
            nextToken
            __typename
          }
          trames {
            nextToken
            __typename
          }
          createdAt
          updatedAt
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      company {
        id
        name
        siret
        address
        postalCode
        city
        countryCode
        contact
        email
        mobile
        phone
        fax
        creationDate
        subscriptionDate
        keyedStart
        users {
          items {
            sub
            firstname
            lastname
            mobile
            beginDate
            endDate
            mappingId
            languageCode
            lastModificationDate
            showReport
            dispatcher
            applicationVersion
            themeId
            companyUsersId
            createdAt
            updatedAt
            __typename
          }
          nextToken
          __typename
        }
        vehicles {
          items {
            immat
            year
            fuelType
            consumption
            maxSpeed
            seatCount
            icon
            kilometerage
            kilometerPrice
            kilometerageStart
            kilometerageDay
            kilometerageLastUpdate
            timeRunning
            counterValue
            co2
            lastModificationDate
            rollingTimeStart
            rollingTimeDay
            locations
            installationPrecautions
            code
            gefcoSend
            tankCapacity
            canMileage
            companyVehiclesId
            createdAt
            updatedAt
            vehicleVehicleCategoryId
            vehicleBrandBrandName
            vehicleModeleId
            vehicleDeviceImei
            __typename
          }
          nextToken
          __typename
        }
        drivers {
          items {
            sub
            firstname
            lastname
            fullname
            birthDate
            drivingLicenseNumber
            drivingLicenseType
            job
            hiringDate
            comment
            driverKey
            email
            mobile
            lastModificationDate
            code
            address
            agencyId
            cdc
            pdm
            nni
            companyDriversId
            createdAt
            updatedAt
            __typename
          }
          nextToken
          __typename
        }
        trames {
          items {
            id
            speed
            lat
            lng
            address
            azimut
            immobilisation
            timestamp
            state
            fuel
            ibuttonCode
            companyId
            driverFullName
            vehicleBrandName
            companyTramesId
            processor
            createdAt
            updatedAt
            trameDriverSub
            trameVehicleImmat
            __typename
          }
          nextToken
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      timestamp
      config {
        id
        name
        type
        disabled
        instantaneous
        reportFrequency
        byMail
        bySms
        byWhatsapp
        smsTemplate
        emailTemplate
        sentToDriver
        phones
        emails
        company {
          id
          name
          siret
          address
          postalCode
          city
          countryCode
          contact
          email
          mobile
          phone
          fax
          creationDate
          subscriptionDate
          keyedStart
          users {
            nextToken
            __typename
          }
          vehicles {
            nextToken
            __typename
          }
          drivers {
            nextToken
            __typename
          }
          trames {
            nextToken
            __typename
          }
          createdAt
          updatedAt
          __typename
        }
        vehicles {
          items {
            id
            vehicleImmat
            alertId
            isFlespi
            createdAt
            updatedAt
            __typename
          }
          nextToken
          __typename
        }
        extra
        zone {
          id
          name
          lat
          lng
          radius
          createdAt
          updatedAt
          __typename
        }
        createdAt
        updatedAt
        alertCompanyId
        alertZoneId
        __typename
      }
      data
      createdAt
      updatedAt
      alertHistoryVehicleImmat
      alertHistoryDriverSub
      alertHistoryCompanyId
      alertHistoryConfigId
      __typename
    }
  }
`;
export const onCreateZone = /* GraphQL */ `
  subscription OnCreateZone($filter: ModelSubscriptionZoneFilterInput) {
    onCreateZone(filter: $filter) {
      id
      name
      lat
      lng
      radius
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateZone = /* GraphQL */ `
  subscription OnUpdateZone($filter: ModelSubscriptionZoneFilterInput) {
    onUpdateZone(filter: $filter) {
      id
      name
      lat
      lng
      radius
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteZone = /* GraphQL */ `
  subscription OnDeleteZone($filter: ModelSubscriptionZoneFilterInput) {
    onDeleteZone(filter: $filter) {
      id
      name
      lat
      lng
      radius
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateVehicleCategory = /* GraphQL */ `
  subscription OnCreateVehicleCategory(
    $filter: ModelSubscriptionVehicleCategoryFilterInput
  ) {
    onCreateVehicleCategory(filter: $filter) {
      id
      category
      description
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateVehicleCategory = /* GraphQL */ `
  subscription OnUpdateVehicleCategory(
    $filter: ModelSubscriptionVehicleCategoryFilterInput
  ) {
    onUpdateVehicleCategory(filter: $filter) {
      id
      category
      description
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteVehicleCategory = /* GraphQL */ `
  subscription OnDeleteVehicleCategory(
    $filter: ModelSubscriptionVehicleCategoryFilterInput
  ) {
    onDeleteVehicleCategory(filter: $filter) {
      id
      category
      description
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateVehicleBrand = /* GraphQL */ `
  subscription OnCreateVehicleBrand(
    $filter: ModelSubscriptionVehicleBrandFilterInput
  ) {
    onCreateVehicleBrand(filter: $filter) {
      brandName
      logo {
        bucket
        region
        key
        __typename
      }
      models {
        items {
          id
          modele
          brand {
            brandName
            createdAt
            updatedAt
            __typename
          }
          createdAt
          updatedAt
          vehicleBrandModelsBrandName
          __typename
        }
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateVehicleBrand = /* GraphQL */ `
  subscription OnUpdateVehicleBrand(
    $filter: ModelSubscriptionVehicleBrandFilterInput
  ) {
    onUpdateVehicleBrand(filter: $filter) {
      brandName
      logo {
        bucket
        region
        key
        __typename
      }
      models {
        items {
          id
          modele
          brand {
            brandName
            createdAt
            updatedAt
            __typename
          }
          createdAt
          updatedAt
          vehicleBrandModelsBrandName
          __typename
        }
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteVehicleBrand = /* GraphQL */ `
  subscription OnDeleteVehicleBrand(
    $filter: ModelSubscriptionVehicleBrandFilterInput
  ) {
    onDeleteVehicleBrand(filter: $filter) {
      brandName
      logo {
        bucket
        region
        key
        __typename
      }
      models {
        items {
          id
          modele
          brand {
            brandName
            createdAt
            updatedAt
            __typename
          }
          createdAt
          updatedAt
          vehicleBrandModelsBrandName
          __typename
        }
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateVehicleModel = /* GraphQL */ `
  subscription OnCreateVehicleModel(
    $filter: ModelSubscriptionVehicleModelFilterInput
  ) {
    onCreateVehicleModel(filter: $filter) {
      id
      modele
      brand {
        brandName
        logo {
          bucket
          region
          key
          __typename
        }
        models {
          items {
            id
            modele
            createdAt
            updatedAt
            vehicleBrandModelsBrandName
            __typename
          }
          nextToken
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      vehicleBrandModelsBrandName
      __typename
    }
  }
`;
export const onUpdateVehicleModel = /* GraphQL */ `
  subscription OnUpdateVehicleModel(
    $filter: ModelSubscriptionVehicleModelFilterInput
  ) {
    onUpdateVehicleModel(filter: $filter) {
      id
      modele
      brand {
        brandName
        logo {
          bucket
          region
          key
          __typename
        }
        models {
          items {
            id
            modele
            createdAt
            updatedAt
            vehicleBrandModelsBrandName
            __typename
          }
          nextToken
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      vehicleBrandModelsBrandName
      __typename
    }
  }
`;
export const onDeleteVehicleModel = /* GraphQL */ `
  subscription OnDeleteVehicleModel(
    $filter: ModelSubscriptionVehicleModelFilterInput
  ) {
    onDeleteVehicleModel(filter: $filter) {
      id
      modele
      brand {
        brandName
        logo {
          bucket
          region
          key
          __typename
        }
        models {
          items {
            id
            modele
            createdAt
            updatedAt
            vehicleBrandModelsBrandName
            __typename
          }
          nextToken
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      vehicleBrandModelsBrandName
      __typename
    }
  }
`;
export const onCreateDevice = /* GraphQL */ `
  subscription OnCreateDevice($filter: ModelSubscriptionDeviceFilterInput) {
    onCreateDevice(filter: $filter) {
      imei
      protocolId
      sim
      vehicle {
        immat
        year
        fuelType
        consumption
        maxSpeed
        seatCount
        icon
        picture {
          bucket
          region
          key
          __typename
        }
        kilometerage
        kilometerPrice
        kilometerageStart
        kilometerageDay
        kilometerageLastUpdate
        timeRunning
        counterValue
        co2
        lastModificationDate
        rollingTimeStart
        rollingTimeDay
        locations
        installationPrecautions
        code
        vehicleCategory {
          id
          category
          description
          createdAt
          updatedAt
          __typename
        }
        brand {
          brandName
          logo {
            bucket
            region
            key
            __typename
          }
          models {
            nextToken
            __typename
          }
          createdAt
          updatedAt
          __typename
        }
        modele {
          id
          modele
          brand {
            brandName
            createdAt
            updatedAt
            __typename
          }
          createdAt
          updatedAt
          vehicleBrandModelsBrandName
          __typename
        }
        gefcoSend
        tankCapacity
        canMileage
        companyVehiclesId
        company {
          id
          name
          siret
          address
          postalCode
          city
          countryCode
          contact
          email
          mobile
          phone
          fax
          creationDate
          subscriptionDate
          keyedStart
          users {
            nextToken
            __typename
          }
          vehicles {
            nextToken
            __typename
          }
          drivers {
            nextToken
            __typename
          }
          trames {
            nextToken
            __typename
          }
          createdAt
          updatedAt
          __typename
        }
        device {
          imei
          protocolId
          sim
          vehicle {
            immat
            year
            fuelType
            consumption
            maxSpeed
            seatCount
            icon
            kilometerage
            kilometerPrice
            kilometerageStart
            kilometerageDay
            kilometerageLastUpdate
            timeRunning
            counterValue
            co2
            lastModificationDate
            rollingTimeStart
            rollingTimeDay
            locations
            installationPrecautions
            code
            gefcoSend
            tankCapacity
            canMileage
            companyVehiclesId
            createdAt
            updatedAt
            vehicleVehicleCategoryId
            vehicleBrandBrandName
            vehicleModeleId
            vehicleDeviceImei
            __typename
          }
          createdAt
          updatedAt
          deviceVehicleImmat
          __typename
        }
        alerts {
          items {
            id
            vehicleImmat
            alertId
            isFlespi
            createdAt
            updatedAt
            __typename
          }
          nextToken
          __typename
        }
        tags {
          items {
            id
            vehicleImmat
            tagId
            createdAt
            updatedAt
            __typename
          }
          nextToken
          __typename
        }
        createdAt
        updatedAt
        vehicleVehicleCategoryId
        vehicleBrandBrandName
        vehicleModeleId
        vehicleDeviceImei
        __typename
      }
      createdAt
      updatedAt
      deviceVehicleImmat
      __typename
    }
  }
`;
export const onUpdateDevice = /* GraphQL */ `
  subscription OnUpdateDevice($filter: ModelSubscriptionDeviceFilterInput) {
    onUpdateDevice(filter: $filter) {
      imei
      protocolId
      sim
      vehicle {
        immat
        year
        fuelType
        consumption
        maxSpeed
        seatCount
        icon
        picture {
          bucket
          region
          key
          __typename
        }
        kilometerage
        kilometerPrice
        kilometerageStart
        kilometerageDay
        kilometerageLastUpdate
        timeRunning
        counterValue
        co2
        lastModificationDate
        rollingTimeStart
        rollingTimeDay
        locations
        installationPrecautions
        code
        vehicleCategory {
          id
          category
          description
          createdAt
          updatedAt
          __typename
        }
        brand {
          brandName
          logo {
            bucket
            region
            key
            __typename
          }
          models {
            nextToken
            __typename
          }
          createdAt
          updatedAt
          __typename
        }
        modele {
          id
          modele
          brand {
            brandName
            createdAt
            updatedAt
            __typename
          }
          createdAt
          updatedAt
          vehicleBrandModelsBrandName
          __typename
        }
        gefcoSend
        tankCapacity
        canMileage
        companyVehiclesId
        company {
          id
          name
          siret
          address
          postalCode
          city
          countryCode
          contact
          email
          mobile
          phone
          fax
          creationDate
          subscriptionDate
          keyedStart
          users {
            nextToken
            __typename
          }
          vehicles {
            nextToken
            __typename
          }
          drivers {
            nextToken
            __typename
          }
          trames {
            nextToken
            __typename
          }
          createdAt
          updatedAt
          __typename
        }
        device {
          imei
          protocolId
          sim
          vehicle {
            immat
            year
            fuelType
            consumption
            maxSpeed
            seatCount
            icon
            kilometerage
            kilometerPrice
            kilometerageStart
            kilometerageDay
            kilometerageLastUpdate
            timeRunning
            counterValue
            co2
            lastModificationDate
            rollingTimeStart
            rollingTimeDay
            locations
            installationPrecautions
            code
            gefcoSend
            tankCapacity
            canMileage
            companyVehiclesId
            createdAt
            updatedAt
            vehicleVehicleCategoryId
            vehicleBrandBrandName
            vehicleModeleId
            vehicleDeviceImei
            __typename
          }
          createdAt
          updatedAt
          deviceVehicleImmat
          __typename
        }
        alerts {
          items {
            id
            vehicleImmat
            alertId
            isFlespi
            createdAt
            updatedAt
            __typename
          }
          nextToken
          __typename
        }
        tags {
          items {
            id
            vehicleImmat
            tagId
            createdAt
            updatedAt
            __typename
          }
          nextToken
          __typename
        }
        createdAt
        updatedAt
        vehicleVehicleCategoryId
        vehicleBrandBrandName
        vehicleModeleId
        vehicleDeviceImei
        __typename
      }
      createdAt
      updatedAt
      deviceVehicleImmat
      __typename
    }
  }
`;
export const onDeleteDevice = /* GraphQL */ `
  subscription OnDeleteDevice($filter: ModelSubscriptionDeviceFilterInput) {
    onDeleteDevice(filter: $filter) {
      imei
      protocolId
      sim
      vehicle {
        immat
        year
        fuelType
        consumption
        maxSpeed
        seatCount
        icon
        picture {
          bucket
          region
          key
          __typename
        }
        kilometerage
        kilometerPrice
        kilometerageStart
        kilometerageDay
        kilometerageLastUpdate
        timeRunning
        counterValue
        co2
        lastModificationDate
        rollingTimeStart
        rollingTimeDay
        locations
        installationPrecautions
        code
        vehicleCategory {
          id
          category
          description
          createdAt
          updatedAt
          __typename
        }
        brand {
          brandName
          logo {
            bucket
            region
            key
            __typename
          }
          models {
            nextToken
            __typename
          }
          createdAt
          updatedAt
          __typename
        }
        modele {
          id
          modele
          brand {
            brandName
            createdAt
            updatedAt
            __typename
          }
          createdAt
          updatedAt
          vehicleBrandModelsBrandName
          __typename
        }
        gefcoSend
        tankCapacity
        canMileage
        companyVehiclesId
        company {
          id
          name
          siret
          address
          postalCode
          city
          countryCode
          contact
          email
          mobile
          phone
          fax
          creationDate
          subscriptionDate
          keyedStart
          users {
            nextToken
            __typename
          }
          vehicles {
            nextToken
            __typename
          }
          drivers {
            nextToken
            __typename
          }
          trames {
            nextToken
            __typename
          }
          createdAt
          updatedAt
          __typename
        }
        device {
          imei
          protocolId
          sim
          vehicle {
            immat
            year
            fuelType
            consumption
            maxSpeed
            seatCount
            icon
            kilometerage
            kilometerPrice
            kilometerageStart
            kilometerageDay
            kilometerageLastUpdate
            timeRunning
            counterValue
            co2
            lastModificationDate
            rollingTimeStart
            rollingTimeDay
            locations
            installationPrecautions
            code
            gefcoSend
            tankCapacity
            canMileage
            companyVehiclesId
            createdAt
            updatedAt
            vehicleVehicleCategoryId
            vehicleBrandBrandName
            vehicleModeleId
            vehicleDeviceImei
            __typename
          }
          createdAt
          updatedAt
          deviceVehicleImmat
          __typename
        }
        alerts {
          items {
            id
            vehicleImmat
            alertId
            isFlespi
            createdAt
            updatedAt
            __typename
          }
          nextToken
          __typename
        }
        tags {
          items {
            id
            vehicleImmat
            tagId
            createdAt
            updatedAt
            __typename
          }
          nextToken
          __typename
        }
        createdAt
        updatedAt
        vehicleVehicleCategoryId
        vehicleBrandBrandName
        vehicleModeleId
        vehicleDeviceImei
        __typename
      }
      createdAt
      updatedAt
      deviceVehicleImmat
      __typename
    }
  }
`;
export const onCreateTrame = /* GraphQL */ `
  subscription OnCreateTrame($filter: ModelSubscriptionTrameFilterInput) {
    onCreateTrame(filter: $filter) {
      id
      speed
      lat
      lng
      address
      azimut
      immobilisation
      timestamp
      state
      fuel
      ibuttonCode
      companyId
      driverFullName
      vehicleBrandName
      companyTramesId
      company {
        id
        name
        siret
        address
        postalCode
        city
        countryCode
        contact
        email
        mobile
        phone
        fax
        creationDate
        subscriptionDate
        keyedStart
        users {
          items {
            sub
            firstname
            lastname
            mobile
            beginDate
            endDate
            mappingId
            languageCode
            lastModificationDate
            showReport
            dispatcher
            applicationVersion
            themeId
            companyUsersId
            createdAt
            updatedAt
            __typename
          }
          nextToken
          __typename
        }
        vehicles {
          items {
            immat
            year
            fuelType
            consumption
            maxSpeed
            seatCount
            icon
            kilometerage
            kilometerPrice
            kilometerageStart
            kilometerageDay
            kilometerageLastUpdate
            timeRunning
            counterValue
            co2
            lastModificationDate
            rollingTimeStart
            rollingTimeDay
            locations
            installationPrecautions
            code
            gefcoSend
            tankCapacity
            canMileage
            companyVehiclesId
            createdAt
            updatedAt
            vehicleVehicleCategoryId
            vehicleBrandBrandName
            vehicleModeleId
            vehicleDeviceImei
            __typename
          }
          nextToken
          __typename
        }
        drivers {
          items {
            sub
            firstname
            lastname
            fullname
            birthDate
            drivingLicenseNumber
            drivingLicenseType
            job
            hiringDate
            comment
            driverKey
            email
            mobile
            lastModificationDate
            code
            address
            agencyId
            cdc
            pdm
            nni
            companyDriversId
            createdAt
            updatedAt
            __typename
          }
          nextToken
          __typename
        }
        trames {
          items {
            id
            speed
            lat
            lng
            address
            azimut
            immobilisation
            timestamp
            state
            fuel
            ibuttonCode
            companyId
            driverFullName
            vehicleBrandName
            companyTramesId
            processor
            createdAt
            updatedAt
            trameDriverSub
            trameVehicleImmat
            __typename
          }
          nextToken
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      driver {
        sub
        firstname
        lastname
        fullname
        birthDate
        drivingLicenseNumber
        drivingLicenseType
        job
        hiringDate
        comment
        driverKey
        email
        mobile
        lastModificationDate
        code
        address
        agencyId
        cdc
        pdm
        nni
        companyDriversId
        company {
          id
          name
          siret
          address
          postalCode
          city
          countryCode
          contact
          email
          mobile
          phone
          fax
          creationDate
          subscriptionDate
          keyedStart
          users {
            nextToken
            __typename
          }
          vehicles {
            nextToken
            __typename
          }
          drivers {
            nextToken
            __typename
          }
          trames {
            nextToken
            __typename
          }
          createdAt
          updatedAt
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      vehicle {
        immat
        year
        fuelType
        consumption
        maxSpeed
        seatCount
        icon
        picture {
          bucket
          region
          key
          __typename
        }
        kilometerage
        kilometerPrice
        kilometerageStart
        kilometerageDay
        kilometerageLastUpdate
        timeRunning
        counterValue
        co2
        lastModificationDate
        rollingTimeStart
        rollingTimeDay
        locations
        installationPrecautions
        code
        vehicleCategory {
          id
          category
          description
          createdAt
          updatedAt
          __typename
        }
        brand {
          brandName
          logo {
            bucket
            region
            key
            __typename
          }
          models {
            nextToken
            __typename
          }
          createdAt
          updatedAt
          __typename
        }
        modele {
          id
          modele
          brand {
            brandName
            createdAt
            updatedAt
            __typename
          }
          createdAt
          updatedAt
          vehicleBrandModelsBrandName
          __typename
        }
        gefcoSend
        tankCapacity
        canMileage
        companyVehiclesId
        company {
          id
          name
          siret
          address
          postalCode
          city
          countryCode
          contact
          email
          mobile
          phone
          fax
          creationDate
          subscriptionDate
          keyedStart
          users {
            nextToken
            __typename
          }
          vehicles {
            nextToken
            __typename
          }
          drivers {
            nextToken
            __typename
          }
          trames {
            nextToken
            __typename
          }
          createdAt
          updatedAt
          __typename
        }
        device {
          imei
          protocolId
          sim
          vehicle {
            immat
            year
            fuelType
            consumption
            maxSpeed
            seatCount
            icon
            kilometerage
            kilometerPrice
            kilometerageStart
            kilometerageDay
            kilometerageLastUpdate
            timeRunning
            counterValue
            co2
            lastModificationDate
            rollingTimeStart
            rollingTimeDay
            locations
            installationPrecautions
            code
            gefcoSend
            tankCapacity
            canMileage
            companyVehiclesId
            createdAt
            updatedAt
            vehicleVehicleCategoryId
            vehicleBrandBrandName
            vehicleModeleId
            vehicleDeviceImei
            __typename
          }
          createdAt
          updatedAt
          deviceVehicleImmat
          __typename
        }
        alerts {
          items {
            id
            vehicleImmat
            alertId
            isFlespi
            createdAt
            updatedAt
            __typename
          }
          nextToken
          __typename
        }
        tags {
          items {
            id
            vehicleImmat
            tagId
            createdAt
            updatedAt
            __typename
          }
          nextToken
          __typename
        }
        createdAt
        updatedAt
        vehicleVehicleCategoryId
        vehicleBrandBrandName
        vehicleModeleId
        vehicleDeviceImei
        __typename
      }
      processor
      createdAt
      updatedAt
      trameDriverSub
      trameVehicleImmat
      __typename
    }
  }
`;
export const onUpdateTrame = /* GraphQL */ `
  subscription OnUpdateTrame($filter: ModelSubscriptionTrameFilterInput) {
    onUpdateTrame(filter: $filter) {
      id
      speed
      lat
      lng
      address
      azimut
      immobilisation
      timestamp
      state
      fuel
      ibuttonCode
      companyId
      driverFullName
      vehicleBrandName
      companyTramesId
      company {
        id
        name
        siret
        address
        postalCode
        city
        countryCode
        contact
        email
        mobile
        phone
        fax
        creationDate
        subscriptionDate
        keyedStart
        users {
          items {
            sub
            firstname
            lastname
            mobile
            beginDate
            endDate
            mappingId
            languageCode
            lastModificationDate
            showReport
            dispatcher
            applicationVersion
            themeId
            companyUsersId
            createdAt
            updatedAt
            __typename
          }
          nextToken
          __typename
        }
        vehicles {
          items {
            immat
            year
            fuelType
            consumption
            maxSpeed
            seatCount
            icon
            kilometerage
            kilometerPrice
            kilometerageStart
            kilometerageDay
            kilometerageLastUpdate
            timeRunning
            counterValue
            co2
            lastModificationDate
            rollingTimeStart
            rollingTimeDay
            locations
            installationPrecautions
            code
            gefcoSend
            tankCapacity
            canMileage
            companyVehiclesId
            createdAt
            updatedAt
            vehicleVehicleCategoryId
            vehicleBrandBrandName
            vehicleModeleId
            vehicleDeviceImei
            __typename
          }
          nextToken
          __typename
        }
        drivers {
          items {
            sub
            firstname
            lastname
            fullname
            birthDate
            drivingLicenseNumber
            drivingLicenseType
            job
            hiringDate
            comment
            driverKey
            email
            mobile
            lastModificationDate
            code
            address
            agencyId
            cdc
            pdm
            nni
            companyDriversId
            createdAt
            updatedAt
            __typename
          }
          nextToken
          __typename
        }
        trames {
          items {
            id
            speed
            lat
            lng
            address
            azimut
            immobilisation
            timestamp
            state
            fuel
            ibuttonCode
            companyId
            driverFullName
            vehicleBrandName
            companyTramesId
            processor
            createdAt
            updatedAt
            trameDriverSub
            trameVehicleImmat
            __typename
          }
          nextToken
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      driver {
        sub
        firstname
        lastname
        fullname
        birthDate
        drivingLicenseNumber
        drivingLicenseType
        job
        hiringDate
        comment
        driverKey
        email
        mobile
        lastModificationDate
        code
        address
        agencyId
        cdc
        pdm
        nni
        companyDriversId
        company {
          id
          name
          siret
          address
          postalCode
          city
          countryCode
          contact
          email
          mobile
          phone
          fax
          creationDate
          subscriptionDate
          keyedStart
          users {
            nextToken
            __typename
          }
          vehicles {
            nextToken
            __typename
          }
          drivers {
            nextToken
            __typename
          }
          trames {
            nextToken
            __typename
          }
          createdAt
          updatedAt
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      vehicle {
        immat
        year
        fuelType
        consumption
        maxSpeed
        seatCount
        icon
        picture {
          bucket
          region
          key
          __typename
        }
        kilometerage
        kilometerPrice
        kilometerageStart
        kilometerageDay
        kilometerageLastUpdate
        timeRunning
        counterValue
        co2
        lastModificationDate
        rollingTimeStart
        rollingTimeDay
        locations
        installationPrecautions
        code
        vehicleCategory {
          id
          category
          description
          createdAt
          updatedAt
          __typename
        }
        brand {
          brandName
          logo {
            bucket
            region
            key
            __typename
          }
          models {
            nextToken
            __typename
          }
          createdAt
          updatedAt
          __typename
        }
        modele {
          id
          modele
          brand {
            brandName
            createdAt
            updatedAt
            __typename
          }
          createdAt
          updatedAt
          vehicleBrandModelsBrandName
          __typename
        }
        gefcoSend
        tankCapacity
        canMileage
        companyVehiclesId
        company {
          id
          name
          siret
          address
          postalCode
          city
          countryCode
          contact
          email
          mobile
          phone
          fax
          creationDate
          subscriptionDate
          keyedStart
          users {
            nextToken
            __typename
          }
          vehicles {
            nextToken
            __typename
          }
          drivers {
            nextToken
            __typename
          }
          trames {
            nextToken
            __typename
          }
          createdAt
          updatedAt
          __typename
        }
        device {
          imei
          protocolId
          sim
          vehicle {
            immat
            year
            fuelType
            consumption
            maxSpeed
            seatCount
            icon
            kilometerage
            kilometerPrice
            kilometerageStart
            kilometerageDay
            kilometerageLastUpdate
            timeRunning
            counterValue
            co2
            lastModificationDate
            rollingTimeStart
            rollingTimeDay
            locations
            installationPrecautions
            code
            gefcoSend
            tankCapacity
            canMileage
            companyVehiclesId
            createdAt
            updatedAt
            vehicleVehicleCategoryId
            vehicleBrandBrandName
            vehicleModeleId
            vehicleDeviceImei
            __typename
          }
          createdAt
          updatedAt
          deviceVehicleImmat
          __typename
        }
        alerts {
          items {
            id
            vehicleImmat
            alertId
            isFlespi
            createdAt
            updatedAt
            __typename
          }
          nextToken
          __typename
        }
        tags {
          items {
            id
            vehicleImmat
            tagId
            createdAt
            updatedAt
            __typename
          }
          nextToken
          __typename
        }
        createdAt
        updatedAt
        vehicleVehicleCategoryId
        vehicleBrandBrandName
        vehicleModeleId
        vehicleDeviceImei
        __typename
      }
      processor
      createdAt
      updatedAt
      trameDriverSub
      trameVehicleImmat
      __typename
    }
  }
`;
export const onDeleteTrame = /* GraphQL */ `
  subscription OnDeleteTrame($filter: ModelSubscriptionTrameFilterInput) {
    onDeleteTrame(filter: $filter) {
      id
      speed
      lat
      lng
      address
      azimut
      immobilisation
      timestamp
      state
      fuel
      ibuttonCode
      companyId
      driverFullName
      vehicleBrandName
      companyTramesId
      company {
        id
        name
        siret
        address
        postalCode
        city
        countryCode
        contact
        email
        mobile
        phone
        fax
        creationDate
        subscriptionDate
        keyedStart
        users {
          items {
            sub
            firstname
            lastname
            mobile
            beginDate
            endDate
            mappingId
            languageCode
            lastModificationDate
            showReport
            dispatcher
            applicationVersion
            themeId
            companyUsersId
            createdAt
            updatedAt
            __typename
          }
          nextToken
          __typename
        }
        vehicles {
          items {
            immat
            year
            fuelType
            consumption
            maxSpeed
            seatCount
            icon
            kilometerage
            kilometerPrice
            kilometerageStart
            kilometerageDay
            kilometerageLastUpdate
            timeRunning
            counterValue
            co2
            lastModificationDate
            rollingTimeStart
            rollingTimeDay
            locations
            installationPrecautions
            code
            gefcoSend
            tankCapacity
            canMileage
            companyVehiclesId
            createdAt
            updatedAt
            vehicleVehicleCategoryId
            vehicleBrandBrandName
            vehicleModeleId
            vehicleDeviceImei
            __typename
          }
          nextToken
          __typename
        }
        drivers {
          items {
            sub
            firstname
            lastname
            fullname
            birthDate
            drivingLicenseNumber
            drivingLicenseType
            job
            hiringDate
            comment
            driverKey
            email
            mobile
            lastModificationDate
            code
            address
            agencyId
            cdc
            pdm
            nni
            companyDriversId
            createdAt
            updatedAt
            __typename
          }
          nextToken
          __typename
        }
        trames {
          items {
            id
            speed
            lat
            lng
            address
            azimut
            immobilisation
            timestamp
            state
            fuel
            ibuttonCode
            companyId
            driverFullName
            vehicleBrandName
            companyTramesId
            processor
            createdAt
            updatedAt
            trameDriverSub
            trameVehicleImmat
            __typename
          }
          nextToken
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      driver {
        sub
        firstname
        lastname
        fullname
        birthDate
        drivingLicenseNumber
        drivingLicenseType
        job
        hiringDate
        comment
        driverKey
        email
        mobile
        lastModificationDate
        code
        address
        agencyId
        cdc
        pdm
        nni
        companyDriversId
        company {
          id
          name
          siret
          address
          postalCode
          city
          countryCode
          contact
          email
          mobile
          phone
          fax
          creationDate
          subscriptionDate
          keyedStart
          users {
            nextToken
            __typename
          }
          vehicles {
            nextToken
            __typename
          }
          drivers {
            nextToken
            __typename
          }
          trames {
            nextToken
            __typename
          }
          createdAt
          updatedAt
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      vehicle {
        immat
        year
        fuelType
        consumption
        maxSpeed
        seatCount
        icon
        picture {
          bucket
          region
          key
          __typename
        }
        kilometerage
        kilometerPrice
        kilometerageStart
        kilometerageDay
        kilometerageLastUpdate
        timeRunning
        counterValue
        co2
        lastModificationDate
        rollingTimeStart
        rollingTimeDay
        locations
        installationPrecautions
        code
        vehicleCategory {
          id
          category
          description
          createdAt
          updatedAt
          __typename
        }
        brand {
          brandName
          logo {
            bucket
            region
            key
            __typename
          }
          models {
            nextToken
            __typename
          }
          createdAt
          updatedAt
          __typename
        }
        modele {
          id
          modele
          brand {
            brandName
            createdAt
            updatedAt
            __typename
          }
          createdAt
          updatedAt
          vehicleBrandModelsBrandName
          __typename
        }
        gefcoSend
        tankCapacity
        canMileage
        companyVehiclesId
        company {
          id
          name
          siret
          address
          postalCode
          city
          countryCode
          contact
          email
          mobile
          phone
          fax
          creationDate
          subscriptionDate
          keyedStart
          users {
            nextToken
            __typename
          }
          vehicles {
            nextToken
            __typename
          }
          drivers {
            nextToken
            __typename
          }
          trames {
            nextToken
            __typename
          }
          createdAt
          updatedAt
          __typename
        }
        device {
          imei
          protocolId
          sim
          vehicle {
            immat
            year
            fuelType
            consumption
            maxSpeed
            seatCount
            icon
            kilometerage
            kilometerPrice
            kilometerageStart
            kilometerageDay
            kilometerageLastUpdate
            timeRunning
            counterValue
            co2
            lastModificationDate
            rollingTimeStart
            rollingTimeDay
            locations
            installationPrecautions
            code
            gefcoSend
            tankCapacity
            canMileage
            companyVehiclesId
            createdAt
            updatedAt
            vehicleVehicleCategoryId
            vehicleBrandBrandName
            vehicleModeleId
            vehicleDeviceImei
            __typename
          }
          createdAt
          updatedAt
          deviceVehicleImmat
          __typename
        }
        alerts {
          items {
            id
            vehicleImmat
            alertId
            isFlespi
            createdAt
            updatedAt
            __typename
          }
          nextToken
          __typename
        }
        tags {
          items {
            id
            vehicleImmat
            tagId
            createdAt
            updatedAt
            __typename
          }
          nextToken
          __typename
        }
        createdAt
        updatedAt
        vehicleVehicleCategoryId
        vehicleBrandBrandName
        vehicleModeleId
        vehicleDeviceImei
        __typename
      }
      processor
      createdAt
      updatedAt
      trameDriverSub
      trameVehicleImmat
      __typename
    }
  }
`;
export const onCreateDvD = /* GraphQL */ `
  subscription OnCreateDvD($filter: ModelSubscriptionDvDFilterInput) {
    onCreateDvD(filter: $filter) {
      id
      dvDVehicleImmat
      vehicle {
        immat
        year
        fuelType
        consumption
        maxSpeed
        seatCount
        icon
        picture {
          bucket
          region
          key
          __typename
        }
        kilometerage
        kilometerPrice
        kilometerageStart
        kilometerageDay
        kilometerageLastUpdate
        timeRunning
        counterValue
        co2
        lastModificationDate
        rollingTimeStart
        rollingTimeDay
        locations
        installationPrecautions
        code
        vehicleCategory {
          id
          category
          description
          createdAt
          updatedAt
          __typename
        }
        brand {
          brandName
          logo {
            bucket
            region
            key
            __typename
          }
          models {
            nextToken
            __typename
          }
          createdAt
          updatedAt
          __typename
        }
        modele {
          id
          modele
          brand {
            brandName
            createdAt
            updatedAt
            __typename
          }
          createdAt
          updatedAt
          vehicleBrandModelsBrandName
          __typename
        }
        gefcoSend
        tankCapacity
        canMileage
        companyVehiclesId
        company {
          id
          name
          siret
          address
          postalCode
          city
          countryCode
          contact
          email
          mobile
          phone
          fax
          creationDate
          subscriptionDate
          keyedStart
          users {
            nextToken
            __typename
          }
          vehicles {
            nextToken
            __typename
          }
          drivers {
            nextToken
            __typename
          }
          trames {
            nextToken
            __typename
          }
          createdAt
          updatedAt
          __typename
        }
        device {
          imei
          protocolId
          sim
          vehicle {
            immat
            year
            fuelType
            consumption
            maxSpeed
            seatCount
            icon
            kilometerage
            kilometerPrice
            kilometerageStart
            kilometerageDay
            kilometerageLastUpdate
            timeRunning
            counterValue
            co2
            lastModificationDate
            rollingTimeStart
            rollingTimeDay
            locations
            installationPrecautions
            code
            gefcoSend
            tankCapacity
            canMileage
            companyVehiclesId
            createdAt
            updatedAt
            vehicleVehicleCategoryId
            vehicleBrandBrandName
            vehicleModeleId
            vehicleDeviceImei
            __typename
          }
          createdAt
          updatedAt
          deviceVehicleImmat
          __typename
        }
        alerts {
          items {
            id
            vehicleImmat
            alertId
            isFlespi
            createdAt
            updatedAt
            __typename
          }
          nextToken
          __typename
        }
        tags {
          items {
            id
            vehicleImmat
            tagId
            createdAt
            updatedAt
            __typename
          }
          nextToken
          __typename
        }
        createdAt
        updatedAt
        vehicleVehicleCategoryId
        vehicleBrandBrandName
        vehicleModeleId
        vehicleDeviceImei
        __typename
      }
      dvDDriverSub
      driver {
        sub
        firstname
        lastname
        fullname
        birthDate
        drivingLicenseNumber
        drivingLicenseType
        job
        hiringDate
        comment
        driverKey
        email
        mobile
        lastModificationDate
        code
        address
        agencyId
        cdc
        pdm
        nni
        companyDriversId
        company {
          id
          name
          siret
          address
          postalCode
          city
          countryCode
          contact
          email
          mobile
          phone
          fax
          creationDate
          subscriptionDate
          keyedStart
          users {
            nextToken
            __typename
          }
          vehicles {
            nextToken
            __typename
          }
          drivers {
            nextToken
            __typename
          }
          trames {
            nextToken
            __typename
          }
          createdAt
          updatedAt
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      company {
        id
        name
        siret
        address
        postalCode
        city
        countryCode
        contact
        email
        mobile
        phone
        fax
        creationDate
        subscriptionDate
        keyedStart
        users {
          items {
            sub
            firstname
            lastname
            mobile
            beginDate
            endDate
            mappingId
            languageCode
            lastModificationDate
            showReport
            dispatcher
            applicationVersion
            themeId
            companyUsersId
            createdAt
            updatedAt
            __typename
          }
          nextToken
          __typename
        }
        vehicles {
          items {
            immat
            year
            fuelType
            consumption
            maxSpeed
            seatCount
            icon
            kilometerage
            kilometerPrice
            kilometerageStart
            kilometerageDay
            kilometerageLastUpdate
            timeRunning
            counterValue
            co2
            lastModificationDate
            rollingTimeStart
            rollingTimeDay
            locations
            installationPrecautions
            code
            gefcoSend
            tankCapacity
            canMileage
            companyVehiclesId
            createdAt
            updatedAt
            vehicleVehicleCategoryId
            vehicleBrandBrandName
            vehicleModeleId
            vehicleDeviceImei
            __typename
          }
          nextToken
          __typename
        }
        drivers {
          items {
            sub
            firstname
            lastname
            fullname
            birthDate
            drivingLicenseNumber
            drivingLicenseType
            job
            hiringDate
            comment
            driverKey
            email
            mobile
            lastModificationDate
            code
            address
            agencyId
            cdc
            pdm
            nni
            companyDriversId
            createdAt
            updatedAt
            __typename
          }
          nextToken
          __typename
        }
        trames {
          items {
            id
            speed
            lat
            lng
            address
            azimut
            immobilisation
            timestamp
            state
            fuel
            ibuttonCode
            companyId
            driverFullName
            vehicleBrandName
            companyTramesId
            processor
            createdAt
            updatedAt
            trameDriverSub
            trameVehicleImmat
            __typename
          }
          nextToken
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      assignmentDate
      unassignmentDate
      createdAt
      updatedAt
      dvDCompanyId
      __typename
    }
  }
`;
export const onUpdateDvD = /* GraphQL */ `
  subscription OnUpdateDvD($filter: ModelSubscriptionDvDFilterInput) {
    onUpdateDvD(filter: $filter) {
      id
      dvDVehicleImmat
      vehicle {
        immat
        year
        fuelType
        consumption
        maxSpeed
        seatCount
        icon
        picture {
          bucket
          region
          key
          __typename
        }
        kilometerage
        kilometerPrice
        kilometerageStart
        kilometerageDay
        kilometerageLastUpdate
        timeRunning
        counterValue
        co2
        lastModificationDate
        rollingTimeStart
        rollingTimeDay
        locations
        installationPrecautions
        code
        vehicleCategory {
          id
          category
          description
          createdAt
          updatedAt
          __typename
        }
        brand {
          brandName
          logo {
            bucket
            region
            key
            __typename
          }
          models {
            nextToken
            __typename
          }
          createdAt
          updatedAt
          __typename
        }
        modele {
          id
          modele
          brand {
            brandName
            createdAt
            updatedAt
            __typename
          }
          createdAt
          updatedAt
          vehicleBrandModelsBrandName
          __typename
        }
        gefcoSend
        tankCapacity
        canMileage
        companyVehiclesId
        company {
          id
          name
          siret
          address
          postalCode
          city
          countryCode
          contact
          email
          mobile
          phone
          fax
          creationDate
          subscriptionDate
          keyedStart
          users {
            nextToken
            __typename
          }
          vehicles {
            nextToken
            __typename
          }
          drivers {
            nextToken
            __typename
          }
          trames {
            nextToken
            __typename
          }
          createdAt
          updatedAt
          __typename
        }
        device {
          imei
          protocolId
          sim
          vehicle {
            immat
            year
            fuelType
            consumption
            maxSpeed
            seatCount
            icon
            kilometerage
            kilometerPrice
            kilometerageStart
            kilometerageDay
            kilometerageLastUpdate
            timeRunning
            counterValue
            co2
            lastModificationDate
            rollingTimeStart
            rollingTimeDay
            locations
            installationPrecautions
            code
            gefcoSend
            tankCapacity
            canMileage
            companyVehiclesId
            createdAt
            updatedAt
            vehicleVehicleCategoryId
            vehicleBrandBrandName
            vehicleModeleId
            vehicleDeviceImei
            __typename
          }
          createdAt
          updatedAt
          deviceVehicleImmat
          __typename
        }
        alerts {
          items {
            id
            vehicleImmat
            alertId
            isFlespi
            createdAt
            updatedAt
            __typename
          }
          nextToken
          __typename
        }
        tags {
          items {
            id
            vehicleImmat
            tagId
            createdAt
            updatedAt
            __typename
          }
          nextToken
          __typename
        }
        createdAt
        updatedAt
        vehicleVehicleCategoryId
        vehicleBrandBrandName
        vehicleModeleId
        vehicleDeviceImei
        __typename
      }
      dvDDriverSub
      driver {
        sub
        firstname
        lastname
        fullname
        birthDate
        drivingLicenseNumber
        drivingLicenseType
        job
        hiringDate
        comment
        driverKey
        email
        mobile
        lastModificationDate
        code
        address
        agencyId
        cdc
        pdm
        nni
        companyDriversId
        company {
          id
          name
          siret
          address
          postalCode
          city
          countryCode
          contact
          email
          mobile
          phone
          fax
          creationDate
          subscriptionDate
          keyedStart
          users {
            nextToken
            __typename
          }
          vehicles {
            nextToken
            __typename
          }
          drivers {
            nextToken
            __typename
          }
          trames {
            nextToken
            __typename
          }
          createdAt
          updatedAt
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      company {
        id
        name
        siret
        address
        postalCode
        city
        countryCode
        contact
        email
        mobile
        phone
        fax
        creationDate
        subscriptionDate
        keyedStart
        users {
          items {
            sub
            firstname
            lastname
            mobile
            beginDate
            endDate
            mappingId
            languageCode
            lastModificationDate
            showReport
            dispatcher
            applicationVersion
            themeId
            companyUsersId
            createdAt
            updatedAt
            __typename
          }
          nextToken
          __typename
        }
        vehicles {
          items {
            immat
            year
            fuelType
            consumption
            maxSpeed
            seatCount
            icon
            kilometerage
            kilometerPrice
            kilometerageStart
            kilometerageDay
            kilometerageLastUpdate
            timeRunning
            counterValue
            co2
            lastModificationDate
            rollingTimeStart
            rollingTimeDay
            locations
            installationPrecautions
            code
            gefcoSend
            tankCapacity
            canMileage
            companyVehiclesId
            createdAt
            updatedAt
            vehicleVehicleCategoryId
            vehicleBrandBrandName
            vehicleModeleId
            vehicleDeviceImei
            __typename
          }
          nextToken
          __typename
        }
        drivers {
          items {
            sub
            firstname
            lastname
            fullname
            birthDate
            drivingLicenseNumber
            drivingLicenseType
            job
            hiringDate
            comment
            driverKey
            email
            mobile
            lastModificationDate
            code
            address
            agencyId
            cdc
            pdm
            nni
            companyDriversId
            createdAt
            updatedAt
            __typename
          }
          nextToken
          __typename
        }
        trames {
          items {
            id
            speed
            lat
            lng
            address
            azimut
            immobilisation
            timestamp
            state
            fuel
            ibuttonCode
            companyId
            driverFullName
            vehicleBrandName
            companyTramesId
            processor
            createdAt
            updatedAt
            trameDriverSub
            trameVehicleImmat
            __typename
          }
          nextToken
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      assignmentDate
      unassignmentDate
      createdAt
      updatedAt
      dvDCompanyId
      __typename
    }
  }
`;
export const onDeleteDvD = /* GraphQL */ `
  subscription OnDeleteDvD($filter: ModelSubscriptionDvDFilterInput) {
    onDeleteDvD(filter: $filter) {
      id
      dvDVehicleImmat
      vehicle {
        immat
        year
        fuelType
        consumption
        maxSpeed
        seatCount
        icon
        picture {
          bucket
          region
          key
          __typename
        }
        kilometerage
        kilometerPrice
        kilometerageStart
        kilometerageDay
        kilometerageLastUpdate
        timeRunning
        counterValue
        co2
        lastModificationDate
        rollingTimeStart
        rollingTimeDay
        locations
        installationPrecautions
        code
        vehicleCategory {
          id
          category
          description
          createdAt
          updatedAt
          __typename
        }
        brand {
          brandName
          logo {
            bucket
            region
            key
            __typename
          }
          models {
            nextToken
            __typename
          }
          createdAt
          updatedAt
          __typename
        }
        modele {
          id
          modele
          brand {
            brandName
            createdAt
            updatedAt
            __typename
          }
          createdAt
          updatedAt
          vehicleBrandModelsBrandName
          __typename
        }
        gefcoSend
        tankCapacity
        canMileage
        companyVehiclesId
        company {
          id
          name
          siret
          address
          postalCode
          city
          countryCode
          contact
          email
          mobile
          phone
          fax
          creationDate
          subscriptionDate
          keyedStart
          users {
            nextToken
            __typename
          }
          vehicles {
            nextToken
            __typename
          }
          drivers {
            nextToken
            __typename
          }
          trames {
            nextToken
            __typename
          }
          createdAt
          updatedAt
          __typename
        }
        device {
          imei
          protocolId
          sim
          vehicle {
            immat
            year
            fuelType
            consumption
            maxSpeed
            seatCount
            icon
            kilometerage
            kilometerPrice
            kilometerageStart
            kilometerageDay
            kilometerageLastUpdate
            timeRunning
            counterValue
            co2
            lastModificationDate
            rollingTimeStart
            rollingTimeDay
            locations
            installationPrecautions
            code
            gefcoSend
            tankCapacity
            canMileage
            companyVehiclesId
            createdAt
            updatedAt
            vehicleVehicleCategoryId
            vehicleBrandBrandName
            vehicleModeleId
            vehicleDeviceImei
            __typename
          }
          createdAt
          updatedAt
          deviceVehicleImmat
          __typename
        }
        alerts {
          items {
            id
            vehicleImmat
            alertId
            isFlespi
            createdAt
            updatedAt
            __typename
          }
          nextToken
          __typename
        }
        tags {
          items {
            id
            vehicleImmat
            tagId
            createdAt
            updatedAt
            __typename
          }
          nextToken
          __typename
        }
        createdAt
        updatedAt
        vehicleVehicleCategoryId
        vehicleBrandBrandName
        vehicleModeleId
        vehicleDeviceImei
        __typename
      }
      dvDDriverSub
      driver {
        sub
        firstname
        lastname
        fullname
        birthDate
        drivingLicenseNumber
        drivingLicenseType
        job
        hiringDate
        comment
        driverKey
        email
        mobile
        lastModificationDate
        code
        address
        agencyId
        cdc
        pdm
        nni
        companyDriversId
        company {
          id
          name
          siret
          address
          postalCode
          city
          countryCode
          contact
          email
          mobile
          phone
          fax
          creationDate
          subscriptionDate
          keyedStart
          users {
            nextToken
            __typename
          }
          vehicles {
            nextToken
            __typename
          }
          drivers {
            nextToken
            __typename
          }
          trames {
            nextToken
            __typename
          }
          createdAt
          updatedAt
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      company {
        id
        name
        siret
        address
        postalCode
        city
        countryCode
        contact
        email
        mobile
        phone
        fax
        creationDate
        subscriptionDate
        keyedStart
        users {
          items {
            sub
            firstname
            lastname
            mobile
            beginDate
            endDate
            mappingId
            languageCode
            lastModificationDate
            showReport
            dispatcher
            applicationVersion
            themeId
            companyUsersId
            createdAt
            updatedAt
            __typename
          }
          nextToken
          __typename
        }
        vehicles {
          items {
            immat
            year
            fuelType
            consumption
            maxSpeed
            seatCount
            icon
            kilometerage
            kilometerPrice
            kilometerageStart
            kilometerageDay
            kilometerageLastUpdate
            timeRunning
            counterValue
            co2
            lastModificationDate
            rollingTimeStart
            rollingTimeDay
            locations
            installationPrecautions
            code
            gefcoSend
            tankCapacity
            canMileage
            companyVehiclesId
            createdAt
            updatedAt
            vehicleVehicleCategoryId
            vehicleBrandBrandName
            vehicleModeleId
            vehicleDeviceImei
            __typename
          }
          nextToken
          __typename
        }
        drivers {
          items {
            sub
            firstname
            lastname
            fullname
            birthDate
            drivingLicenseNumber
            drivingLicenseType
            job
            hiringDate
            comment
            driverKey
            email
            mobile
            lastModificationDate
            code
            address
            agencyId
            cdc
            pdm
            nni
            companyDriversId
            createdAt
            updatedAt
            __typename
          }
          nextToken
          __typename
        }
        trames {
          items {
            id
            speed
            lat
            lng
            address
            azimut
            immobilisation
            timestamp
            state
            fuel
            ibuttonCode
            companyId
            driverFullName
            vehicleBrandName
            companyTramesId
            processor
            createdAt
            updatedAt
            trameDriverSub
            trameVehicleImmat
            __typename
          }
          nextToken
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      assignmentDate
      unassignmentDate
      createdAt
      updatedAt
      dvDCompanyId
      __typename
    }
  }
`;
export const onCreateDepense = /* GraphQL */ `
  subscription OnCreateDepense($filter: ModelSubscriptionDepenseFilterInput) {
    onCreateDepense(filter: $filter) {
      id
      vehicle {
        immat
        year
        fuelType
        consumption
        maxSpeed
        seatCount
        icon
        picture {
          bucket
          region
          key
          __typename
        }
        kilometerage
        kilometerPrice
        kilometerageStart
        kilometerageDay
        kilometerageLastUpdate
        timeRunning
        counterValue
        co2
        lastModificationDate
        rollingTimeStart
        rollingTimeDay
        locations
        installationPrecautions
        code
        vehicleCategory {
          id
          category
          description
          createdAt
          updatedAt
          __typename
        }
        brand {
          brandName
          logo {
            bucket
            region
            key
            __typename
          }
          models {
            nextToken
            __typename
          }
          createdAt
          updatedAt
          __typename
        }
        modele {
          id
          modele
          brand {
            brandName
            createdAt
            updatedAt
            __typename
          }
          createdAt
          updatedAt
          vehicleBrandModelsBrandName
          __typename
        }
        gefcoSend
        tankCapacity
        canMileage
        companyVehiclesId
        company {
          id
          name
          siret
          address
          postalCode
          city
          countryCode
          contact
          email
          mobile
          phone
          fax
          creationDate
          subscriptionDate
          keyedStart
          users {
            nextToken
            __typename
          }
          vehicles {
            nextToken
            __typename
          }
          drivers {
            nextToken
            __typename
          }
          trames {
            nextToken
            __typename
          }
          createdAt
          updatedAt
          __typename
        }
        device {
          imei
          protocolId
          sim
          vehicle {
            immat
            year
            fuelType
            consumption
            maxSpeed
            seatCount
            icon
            kilometerage
            kilometerPrice
            kilometerageStart
            kilometerageDay
            kilometerageLastUpdate
            timeRunning
            counterValue
            co2
            lastModificationDate
            rollingTimeStart
            rollingTimeDay
            locations
            installationPrecautions
            code
            gefcoSend
            tankCapacity
            canMileage
            companyVehiclesId
            createdAt
            updatedAt
            vehicleVehicleCategoryId
            vehicleBrandBrandName
            vehicleModeleId
            vehicleDeviceImei
            __typename
          }
          createdAt
          updatedAt
          deviceVehicleImmat
          __typename
        }
        alerts {
          items {
            id
            vehicleImmat
            alertId
            isFlespi
            createdAt
            updatedAt
            __typename
          }
          nextToken
          __typename
        }
        tags {
          items {
            id
            vehicleImmat
            tagId
            createdAt
            updatedAt
            __typename
          }
          nextToken
          __typename
        }
        createdAt
        updatedAt
        vehicleVehicleCategoryId
        vehicleBrandBrandName
        vehicleModeleId
        vehicleDeviceImei
        __typename
      }
      type
      prestataire
      montantTTC
      montantHT
      associateDate
      produit
      qte
      description
      companyId
      createdAt
      updatedAt
      depenseVehicleImmat
      __typename
    }
  }
`;
export const onUpdateDepense = /* GraphQL */ `
  subscription OnUpdateDepense($filter: ModelSubscriptionDepenseFilterInput) {
    onUpdateDepense(filter: $filter) {
      id
      vehicle {
        immat
        year
        fuelType
        consumption
        maxSpeed
        seatCount
        icon
        picture {
          bucket
          region
          key
          __typename
        }
        kilometerage
        kilometerPrice
        kilometerageStart
        kilometerageDay
        kilometerageLastUpdate
        timeRunning
        counterValue
        co2
        lastModificationDate
        rollingTimeStart
        rollingTimeDay
        locations
        installationPrecautions
        code
        vehicleCategory {
          id
          category
          description
          createdAt
          updatedAt
          __typename
        }
        brand {
          brandName
          logo {
            bucket
            region
            key
            __typename
          }
          models {
            nextToken
            __typename
          }
          createdAt
          updatedAt
          __typename
        }
        modele {
          id
          modele
          brand {
            brandName
            createdAt
            updatedAt
            __typename
          }
          createdAt
          updatedAt
          vehicleBrandModelsBrandName
          __typename
        }
        gefcoSend
        tankCapacity
        canMileage
        companyVehiclesId
        company {
          id
          name
          siret
          address
          postalCode
          city
          countryCode
          contact
          email
          mobile
          phone
          fax
          creationDate
          subscriptionDate
          keyedStart
          users {
            nextToken
            __typename
          }
          vehicles {
            nextToken
            __typename
          }
          drivers {
            nextToken
            __typename
          }
          trames {
            nextToken
            __typename
          }
          createdAt
          updatedAt
          __typename
        }
        device {
          imei
          protocolId
          sim
          vehicle {
            immat
            year
            fuelType
            consumption
            maxSpeed
            seatCount
            icon
            kilometerage
            kilometerPrice
            kilometerageStart
            kilometerageDay
            kilometerageLastUpdate
            timeRunning
            counterValue
            co2
            lastModificationDate
            rollingTimeStart
            rollingTimeDay
            locations
            installationPrecautions
            code
            gefcoSend
            tankCapacity
            canMileage
            companyVehiclesId
            createdAt
            updatedAt
            vehicleVehicleCategoryId
            vehicleBrandBrandName
            vehicleModeleId
            vehicleDeviceImei
            __typename
          }
          createdAt
          updatedAt
          deviceVehicleImmat
          __typename
        }
        alerts {
          items {
            id
            vehicleImmat
            alertId
            isFlespi
            createdAt
            updatedAt
            __typename
          }
          nextToken
          __typename
        }
        tags {
          items {
            id
            vehicleImmat
            tagId
            createdAt
            updatedAt
            __typename
          }
          nextToken
          __typename
        }
        createdAt
        updatedAt
        vehicleVehicleCategoryId
        vehicleBrandBrandName
        vehicleModeleId
        vehicleDeviceImei
        __typename
      }
      type
      prestataire
      montantTTC
      montantHT
      associateDate
      produit
      qte
      description
      companyId
      createdAt
      updatedAt
      depenseVehicleImmat
      __typename
    }
  }
`;
export const onDeleteDepense = /* GraphQL */ `
  subscription OnDeleteDepense($filter: ModelSubscriptionDepenseFilterInput) {
    onDeleteDepense(filter: $filter) {
      id
      vehicle {
        immat
        year
        fuelType
        consumption
        maxSpeed
        seatCount
        icon
        picture {
          bucket
          region
          key
          __typename
        }
        kilometerage
        kilometerPrice
        kilometerageStart
        kilometerageDay
        kilometerageLastUpdate
        timeRunning
        counterValue
        co2
        lastModificationDate
        rollingTimeStart
        rollingTimeDay
        locations
        installationPrecautions
        code
        vehicleCategory {
          id
          category
          description
          createdAt
          updatedAt
          __typename
        }
        brand {
          brandName
          logo {
            bucket
            region
            key
            __typename
          }
          models {
            nextToken
            __typename
          }
          createdAt
          updatedAt
          __typename
        }
        modele {
          id
          modele
          brand {
            brandName
            createdAt
            updatedAt
            __typename
          }
          createdAt
          updatedAt
          vehicleBrandModelsBrandName
          __typename
        }
        gefcoSend
        tankCapacity
        canMileage
        companyVehiclesId
        company {
          id
          name
          siret
          address
          postalCode
          city
          countryCode
          contact
          email
          mobile
          phone
          fax
          creationDate
          subscriptionDate
          keyedStart
          users {
            nextToken
            __typename
          }
          vehicles {
            nextToken
            __typename
          }
          drivers {
            nextToken
            __typename
          }
          trames {
            nextToken
            __typename
          }
          createdAt
          updatedAt
          __typename
        }
        device {
          imei
          protocolId
          sim
          vehicle {
            immat
            year
            fuelType
            consumption
            maxSpeed
            seatCount
            icon
            kilometerage
            kilometerPrice
            kilometerageStart
            kilometerageDay
            kilometerageLastUpdate
            timeRunning
            counterValue
            co2
            lastModificationDate
            rollingTimeStart
            rollingTimeDay
            locations
            installationPrecautions
            code
            gefcoSend
            tankCapacity
            canMileage
            companyVehiclesId
            createdAt
            updatedAt
            vehicleVehicleCategoryId
            vehicleBrandBrandName
            vehicleModeleId
            vehicleDeviceImei
            __typename
          }
          createdAt
          updatedAt
          deviceVehicleImmat
          __typename
        }
        alerts {
          items {
            id
            vehicleImmat
            alertId
            isFlespi
            createdAt
            updatedAt
            __typename
          }
          nextToken
          __typename
        }
        tags {
          items {
            id
            vehicleImmat
            tagId
            createdAt
            updatedAt
            __typename
          }
          nextToken
          __typename
        }
        createdAt
        updatedAt
        vehicleVehicleCategoryId
        vehicleBrandBrandName
        vehicleModeleId
        vehicleDeviceImei
        __typename
      }
      type
      prestataire
      montantTTC
      montantHT
      associateDate
      produit
      qte
      description
      companyId
      createdAt
      updatedAt
      depenseVehicleImmat
      __typename
    }
  }
`;
export const onCreateLabelsCollection = /* GraphQL */ `
  subscription OnCreateLabelsCollection(
    $filter: ModelSubscriptionLabelsCollectionFilterInput
  ) {
    onCreateLabelsCollection(filter: $filter) {
      key
      label
      type
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateLabelsCollection = /* GraphQL */ `
  subscription OnUpdateLabelsCollection(
    $filter: ModelSubscriptionLabelsCollectionFilterInput
  ) {
    onUpdateLabelsCollection(filter: $filter) {
      key
      label
      type
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteLabelsCollection = /* GraphQL */ `
  subscription OnDeleteLabelsCollection(
    $filter: ModelSubscriptionLabelsCollectionFilterInput
  ) {
    onDeleteLabelsCollection(filter: $filter) {
      key
      label
      type
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateTag = /* GraphQL */ `
  subscription OnCreateTag($filter: ModelSubscriptionTagFilterInput) {
    onCreateTag(filter: $filter) {
      id
      name
      description
      color
      vehicles {
        items {
          id
          vehicleImmat
          tagId
          vehicle {
            immat
            year
            fuelType
            consumption
            maxSpeed
            seatCount
            icon
            kilometerage
            kilometerPrice
            kilometerageStart
            kilometerageDay
            kilometerageLastUpdate
            timeRunning
            counterValue
            co2
            lastModificationDate
            rollingTimeStart
            rollingTimeDay
            locations
            installationPrecautions
            code
            gefcoSend
            tankCapacity
            canMileage
            companyVehiclesId
            createdAt
            updatedAt
            vehicleVehicleCategoryId
            vehicleBrandBrandName
            vehicleModeleId
            vehicleDeviceImei
            __typename
          }
          tag {
            id
            name
            description
            color
            createdAt
            updatedAt
            __typename
          }
          createdAt
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateTag = /* GraphQL */ `
  subscription OnUpdateTag($filter: ModelSubscriptionTagFilterInput) {
    onUpdateTag(filter: $filter) {
      id
      name
      description
      color
      vehicles {
        items {
          id
          vehicleImmat
          tagId
          vehicle {
            immat
            year
            fuelType
            consumption
            maxSpeed
            seatCount
            icon
            kilometerage
            kilometerPrice
            kilometerageStart
            kilometerageDay
            kilometerageLastUpdate
            timeRunning
            counterValue
            co2
            lastModificationDate
            rollingTimeStart
            rollingTimeDay
            locations
            installationPrecautions
            code
            gefcoSend
            tankCapacity
            canMileage
            companyVehiclesId
            createdAt
            updatedAt
            vehicleVehicleCategoryId
            vehicleBrandBrandName
            vehicleModeleId
            vehicleDeviceImei
            __typename
          }
          tag {
            id
            name
            description
            color
            createdAt
            updatedAt
            __typename
          }
          createdAt
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteTag = /* GraphQL */ `
  subscription OnDeleteTag($filter: ModelSubscriptionTagFilterInput) {
    onDeleteTag(filter: $filter) {
      id
      name
      description
      color
      vehicles {
        items {
          id
          vehicleImmat
          tagId
          vehicle {
            immat
            year
            fuelType
            consumption
            maxSpeed
            seatCount
            icon
            kilometerage
            kilometerPrice
            kilometerageStart
            kilometerageDay
            kilometerageLastUpdate
            timeRunning
            counterValue
            co2
            lastModificationDate
            rollingTimeStart
            rollingTimeDay
            locations
            installationPrecautions
            code
            gefcoSend
            tankCapacity
            canMileage
            companyVehiclesId
            createdAt
            updatedAt
            vehicleVehicleCategoryId
            vehicleBrandBrandName
            vehicleModeleId
            vehicleDeviceImei
            __typename
          }
          tag {
            id
            name
            description
            color
            createdAt
            updatedAt
            __typename
          }
          createdAt
          updatedAt
          __typename
        }
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateVehicleTags = /* GraphQL */ `
  subscription OnCreateVehicleTags(
    $filter: ModelSubscriptionVehicleTagsFilterInput
  ) {
    onCreateVehicleTags(filter: $filter) {
      id
      vehicleImmat
      tagId
      vehicle {
        immat
        year
        fuelType
        consumption
        maxSpeed
        seatCount
        icon
        picture {
          bucket
          region
          key
          __typename
        }
        kilometerage
        kilometerPrice
        kilometerageStart
        kilometerageDay
        kilometerageLastUpdate
        timeRunning
        counterValue
        co2
        lastModificationDate
        rollingTimeStart
        rollingTimeDay
        locations
        installationPrecautions
        code
        vehicleCategory {
          id
          category
          description
          createdAt
          updatedAt
          __typename
        }
        brand {
          brandName
          logo {
            bucket
            region
            key
            __typename
          }
          models {
            nextToken
            __typename
          }
          createdAt
          updatedAt
          __typename
        }
        modele {
          id
          modele
          brand {
            brandName
            createdAt
            updatedAt
            __typename
          }
          createdAt
          updatedAt
          vehicleBrandModelsBrandName
          __typename
        }
        gefcoSend
        tankCapacity
        canMileage
        companyVehiclesId
        company {
          id
          name
          siret
          address
          postalCode
          city
          countryCode
          contact
          email
          mobile
          phone
          fax
          creationDate
          subscriptionDate
          keyedStart
          users {
            nextToken
            __typename
          }
          vehicles {
            nextToken
            __typename
          }
          drivers {
            nextToken
            __typename
          }
          trames {
            nextToken
            __typename
          }
          createdAt
          updatedAt
          __typename
        }
        device {
          imei
          protocolId
          sim
          vehicle {
            immat
            year
            fuelType
            consumption
            maxSpeed
            seatCount
            icon
            kilometerage
            kilometerPrice
            kilometerageStart
            kilometerageDay
            kilometerageLastUpdate
            timeRunning
            counterValue
            co2
            lastModificationDate
            rollingTimeStart
            rollingTimeDay
            locations
            installationPrecautions
            code
            gefcoSend
            tankCapacity
            canMileage
            companyVehiclesId
            createdAt
            updatedAt
            vehicleVehicleCategoryId
            vehicleBrandBrandName
            vehicleModeleId
            vehicleDeviceImei
            __typename
          }
          createdAt
          updatedAt
          deviceVehicleImmat
          __typename
        }
        alerts {
          items {
            id
            vehicleImmat
            alertId
            isFlespi
            createdAt
            updatedAt
            __typename
          }
          nextToken
          __typename
        }
        tags {
          items {
            id
            vehicleImmat
            tagId
            createdAt
            updatedAt
            __typename
          }
          nextToken
          __typename
        }
        createdAt
        updatedAt
        vehicleVehicleCategoryId
        vehicleBrandBrandName
        vehicleModeleId
        vehicleDeviceImei
        __typename
      }
      tag {
        id
        name
        description
        color
        vehicles {
          items {
            id
            vehicleImmat
            tagId
            createdAt
            updatedAt
            __typename
          }
          nextToken
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateVehicleTags = /* GraphQL */ `
  subscription OnUpdateVehicleTags(
    $filter: ModelSubscriptionVehicleTagsFilterInput
  ) {
    onUpdateVehicleTags(filter: $filter) {
      id
      vehicleImmat
      tagId
      vehicle {
        immat
        year
        fuelType
        consumption
        maxSpeed
        seatCount
        icon
        picture {
          bucket
          region
          key
          __typename
        }
        kilometerage
        kilometerPrice
        kilometerageStart
        kilometerageDay
        kilometerageLastUpdate
        timeRunning
        counterValue
        co2
        lastModificationDate
        rollingTimeStart
        rollingTimeDay
        locations
        installationPrecautions
        code
        vehicleCategory {
          id
          category
          description
          createdAt
          updatedAt
          __typename
        }
        brand {
          brandName
          logo {
            bucket
            region
            key
            __typename
          }
          models {
            nextToken
            __typename
          }
          createdAt
          updatedAt
          __typename
        }
        modele {
          id
          modele
          brand {
            brandName
            createdAt
            updatedAt
            __typename
          }
          createdAt
          updatedAt
          vehicleBrandModelsBrandName
          __typename
        }
        gefcoSend
        tankCapacity
        canMileage
        companyVehiclesId
        company {
          id
          name
          siret
          address
          postalCode
          city
          countryCode
          contact
          email
          mobile
          phone
          fax
          creationDate
          subscriptionDate
          keyedStart
          users {
            nextToken
            __typename
          }
          vehicles {
            nextToken
            __typename
          }
          drivers {
            nextToken
            __typename
          }
          trames {
            nextToken
            __typename
          }
          createdAt
          updatedAt
          __typename
        }
        device {
          imei
          protocolId
          sim
          vehicle {
            immat
            year
            fuelType
            consumption
            maxSpeed
            seatCount
            icon
            kilometerage
            kilometerPrice
            kilometerageStart
            kilometerageDay
            kilometerageLastUpdate
            timeRunning
            counterValue
            co2
            lastModificationDate
            rollingTimeStart
            rollingTimeDay
            locations
            installationPrecautions
            code
            gefcoSend
            tankCapacity
            canMileage
            companyVehiclesId
            createdAt
            updatedAt
            vehicleVehicleCategoryId
            vehicleBrandBrandName
            vehicleModeleId
            vehicleDeviceImei
            __typename
          }
          createdAt
          updatedAt
          deviceVehicleImmat
          __typename
        }
        alerts {
          items {
            id
            vehicleImmat
            alertId
            isFlespi
            createdAt
            updatedAt
            __typename
          }
          nextToken
          __typename
        }
        tags {
          items {
            id
            vehicleImmat
            tagId
            createdAt
            updatedAt
            __typename
          }
          nextToken
          __typename
        }
        createdAt
        updatedAt
        vehicleVehicleCategoryId
        vehicleBrandBrandName
        vehicleModeleId
        vehicleDeviceImei
        __typename
      }
      tag {
        id
        name
        description
        color
        vehicles {
          items {
            id
            vehicleImmat
            tagId
            createdAt
            updatedAt
            __typename
          }
          nextToken
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteVehicleTags = /* GraphQL */ `
  subscription OnDeleteVehicleTags(
    $filter: ModelSubscriptionVehicleTagsFilterInput
  ) {
    onDeleteVehicleTags(filter: $filter) {
      id
      vehicleImmat
      tagId
      vehicle {
        immat
        year
        fuelType
        consumption
        maxSpeed
        seatCount
        icon
        picture {
          bucket
          region
          key
          __typename
        }
        kilometerage
        kilometerPrice
        kilometerageStart
        kilometerageDay
        kilometerageLastUpdate
        timeRunning
        counterValue
        co2
        lastModificationDate
        rollingTimeStart
        rollingTimeDay
        locations
        installationPrecautions
        code
        vehicleCategory {
          id
          category
          description
          createdAt
          updatedAt
          __typename
        }
        brand {
          brandName
          logo {
            bucket
            region
            key
            __typename
          }
          models {
            nextToken
            __typename
          }
          createdAt
          updatedAt
          __typename
        }
        modele {
          id
          modele
          brand {
            brandName
            createdAt
            updatedAt
            __typename
          }
          createdAt
          updatedAt
          vehicleBrandModelsBrandName
          __typename
        }
        gefcoSend
        tankCapacity
        canMileage
        companyVehiclesId
        company {
          id
          name
          siret
          address
          postalCode
          city
          countryCode
          contact
          email
          mobile
          phone
          fax
          creationDate
          subscriptionDate
          keyedStart
          users {
            nextToken
            __typename
          }
          vehicles {
            nextToken
            __typename
          }
          drivers {
            nextToken
            __typename
          }
          trames {
            nextToken
            __typename
          }
          createdAt
          updatedAt
          __typename
        }
        device {
          imei
          protocolId
          sim
          vehicle {
            immat
            year
            fuelType
            consumption
            maxSpeed
            seatCount
            icon
            kilometerage
            kilometerPrice
            kilometerageStart
            kilometerageDay
            kilometerageLastUpdate
            timeRunning
            counterValue
            co2
            lastModificationDate
            rollingTimeStart
            rollingTimeDay
            locations
            installationPrecautions
            code
            gefcoSend
            tankCapacity
            canMileage
            companyVehiclesId
            createdAt
            updatedAt
            vehicleVehicleCategoryId
            vehicleBrandBrandName
            vehicleModeleId
            vehicleDeviceImei
            __typename
          }
          createdAt
          updatedAt
          deviceVehicleImmat
          __typename
        }
        alerts {
          items {
            id
            vehicleImmat
            alertId
            isFlespi
            createdAt
            updatedAt
            __typename
          }
          nextToken
          __typename
        }
        tags {
          items {
            id
            vehicleImmat
            tagId
            createdAt
            updatedAt
            __typename
          }
          nextToken
          __typename
        }
        createdAt
        updatedAt
        vehicleVehicleCategoryId
        vehicleBrandBrandName
        vehicleModeleId
        vehicleDeviceImei
        __typename
      }
      tag {
        id
        name
        description
        color
        vehicles {
          items {
            id
            vehicleImmat
            tagId
            createdAt
            updatedAt
            __typename
          }
          nextToken
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
