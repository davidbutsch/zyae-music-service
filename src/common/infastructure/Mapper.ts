export interface Mapper<Domain, DTO> {
  toDTO: (domain: Domain) => DTO;
}
