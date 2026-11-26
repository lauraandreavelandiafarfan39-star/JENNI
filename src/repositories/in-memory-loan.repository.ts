import { ICreateLoanDTO } from '../dtos/loan.dto';
import {
  Loan,
  LoanFilters,
  LoanRepository,
  LoanStats,
  LoanStatus,
} from './loan.repository';

export class InMemoryLoanRepository implements LoanRepository {
  private readonly loans = new Map<number, Loan>();
  private nextId = 1;

  public async create(input: ICreateLoanDTO): Promise<Loan> {
    const loan: Loan = {
      ...input,
      id: this.nextId++,
      estado: 'PENDIENTE_APROBACION',
      createdAt: new Date().toISOString(),
      acceptedAt: null,
    };
    this.loans.set(loan.id, loan);
    return { ...loan };
  }

  public async findAll(filters?: LoanFilters): Promise<Loan[]> {
    const allLoans = Array.from(this.loans.values());
    if (filters?.roomId) {
      return allLoans
        .filter((loan) => loan.roomId === filters.roomId)
        .map((loan) => ({ ...loan }));
    }
    return allLoans.map((loan) => ({ ...loan }));
  }

  public async findById(id: number): Promise<Loan | null> {
    const loan = this.loans.get(id);
    return loan ? { ...loan } : null;
  }

  public async updateStatus(
    id: number,
    expectedStatus: LoanStatus,
    status: LoanStatus
  ): Promise<Loan | null> {
    const loan = this.loans.get(id);
    if (!loan || loan.estado !== expectedStatus) {
      return null;
    }
    loan.estado = status;
    if (status === 'APROBADO_Y_FIRMADO') {
      loan.acceptedAt = new Date().toISOString();
    }
    this.loans.set(id, loan);
    return { ...loan };
  }

  public async getStats(): Promise<LoanStats> {
    const allLoans = Array.from(this.loans.values());
    let pendientes = 0;
    let aprobados = 0;
    let totalPcsPrestados = 0;

    for (const loan of allLoans) {
      if (loan.estado === 'PENDIENTE_APROBACION') {
        pendientes++;
      } else if (loan.estado === 'APROBADO_Y_FIRMADO') {
        aprobados++;
      }
      totalPcsPrestados += loan.numeroPc;
    }

    return {
      total: allLoans.length,
      pendientes,
      aprobados,
      totalPcsPrestados,
    };
  }
}
