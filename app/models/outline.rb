class Outline < ApplicationRecord
  # before_validation :check_outline_limit, only: :create

  belongs_to :user
  validates :name, uniqueness: true, presence: true, length: { minimum: 3, maximum: 15 }

  # def check_outline_limit
  #
  # end
end
