/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { SocioEntity } from '../Socio/Socio.entity/Socio.entity';
import { SocioService } from './Socio.service';

import { faker } from '@faker-js/faker';

describe('SocioService', () => {
  let service: SocioService;
  let repository: Repository<SocioEntity>;
  let SociosList: SocioEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [SocioService],
    }).compile();

    service = module.get<SocioService>(SocioService);
    repository = module.get<Repository<SocioEntity>>(getRepositoryToken(SocioEntity));
    await seedDatabase();
  });

  const seedDatabase = async () => {
    repository.clear();
    SociosList = [];
    for(let i = 0; i < 5; i++){
        const Socio: SocioEntity = await repository.save({
        usuario: faker.word.sample(), 
        email: faker.internet.email(),
        fechaNacimiento: faker.date.past().toISOString(),
        clubs: [],
      });
        SociosList.push(Socio);
    }
  }
    
  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('findAll should return all Socios', async () => {
    const Socios: SocioEntity[] = await service.findAll();
    expect(Socios).not.toBeNull();
    expect(Socios).toHaveLength(SociosList.length);
  });

  it('findOne should return a Socio by id', async () => {
    const storedSocio: SocioEntity = SociosList[0];
    const Socio: SocioEntity = await service.findOne(storedSocio.id);
    expect(Socio).not.toBeNull();
    expect(Socio.usuario).toEqual(storedSocio.usuario);
    expect(Socio.email).toEqual(storedSocio.email);
    expect(Socio.fechaNacimiento).toEqual(storedSocio.fechaNacimiento);
  });

  it('findOne should throw an exception for an invalid Socio', async () => {
    await expect(() => service.findOne("0")).rejects.toHaveProperty("message", "The Socio with the given id was not found")
  });

  it('create should return a new Socio', async () => {
    const Socio: SocioEntity = {
      id: faker.string.uuid(),
      usuario: faker.word.sample(), 
      email: faker.internet.email(),
      fechaNacimiento: faker.date.past().toISOString(),
      clubs: [],
    }

    const newSocio: SocioEntity = await service.create(Socio);
    expect(newSocio).not.toBeNull();

    const storedSocio: SocioEntity = await repository.findOne({where: {id: newSocio.id}})
    expect(storedSocio).not.toBeNull();
    expect(storedSocio.usuario).toEqual(Socio.usuario)
    expect(storedSocio.email).toEqual(Socio.email)
    expect(storedSocio.fechaNacimiento).toEqual(Socio.fechaNacimiento)
  });

  it('update should modify a Socio', async () => {
    const Socio: SocioEntity = SociosList[0];
    Socio.usuario = "New user";
    Socio.email = "New email";
  
    const updatedSocio: SocioEntity = await service.update(Socio.id, Socio);
    expect(updatedSocio).not.toBeNull();
  
    const storedSocio: SocioEntity = await repository.findOne({ where: { id: Socio.id } })
    expect(storedSocio).not.toBeNull();
    expect(storedSocio.usuario).toEqual(Socio.usuario)
    expect(storedSocio.email).toEqual(Socio.email)
  });
 
  it('update should throw an exception for an invalid Socio', async () => {
    let Socio: SocioEntity = SociosList[0];
    Socio = {
      ...Socio, usuario: "New user", email: "New email"
    }
    await expect(() => service.update("0", Socio)).rejects.toHaveProperty("message", "The Socio with the given id was not found")
  });

  it('delete should remove a Socio', async () => {
    const Socio: SocioEntity = SociosList[0];
    await service.delete(Socio.id);
  
    const deletedSocio: SocioEntity = await repository.findOne({ where: { id: Socio.id } })
    expect(deletedSocio).toBeNull();
  });

  it('delete should throw an exception for an invalid Socio', async () => {
    const Socio: SocioEntity = SociosList[0];
    await service.delete(Socio.id);
    await expect(() => service.delete("0")).rejects.toHaveProperty("message", "The Socio with the given id was not found")
  });
 
});
