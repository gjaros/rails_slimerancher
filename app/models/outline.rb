class Outline < ApplicationRecord
  belongs_to :user
  validates :name, presence: true, length: { minimum: 3, maximum: 15 }
end
