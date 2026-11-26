import { ICreateLoanDTO } from '../dtos/loan.dto';
import { DomainError } from '../errors/domain.error';
import {
  Loan,
  LoanFilters,
  LoanRepository,
} from '../repositories/loan.repository';

export class LoanService {
  constructor(private readonly loanRepository: LoanRepository) {}

  public createLoan(input: ICreateLoanDTO): Promise<Loan> {
    return this.loanRepository.create(input);
  }

  public getLoans(filters: LoanFilters = {}): Promise<Loan[]> {
    return this.loanRepository.findAll(filters);
  }

  public async getLoanDetail(id: string): Promise<Loan> {
    const loan = await this.loanRepository.findById(id);
    if (!loan) {
      throw new DomainError(
        'NOT_FOUND',
        `No existe un préstamo con identificador ${id}.`
      );
    }
    return loan;
  }

  public async acceptLoan(id: string): Promise<Loan> {
    const updated = await this.loanRepository.updateStatus(
      id,
      'PENDIENTE_APROBACION',
      'APROBADO_Y_FIRMADO'
    );
    if (updated) return updated;

    const current = await this.loanRepository.findById(id);
    if (!current) throw new DomainError('NOT_FOUND', 'No existe el préstamo.');
    throw new DomainError('CONFLICT', 'El préstamo ya fue aceptado.');
  }
}
